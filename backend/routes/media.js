const express = require('express');
const { body, validationResult, query } = require('express-validator');
const MediaItem = require('../models/MediaItem');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   GET /api/media
// @desc    Get all media items for user with search and filter
// @access  Private
router.get('/', [
  query('search').optional().trim(),
  query('type').optional().isIn(['movie', 'show']),
  query('genre').optional().trim(),
  query('status').optional().isIn(['watched', 'unwatched', 'watching']),
  query('sortBy').optional().isIn(['title', 'createdAt', 'updatedAt', 'rating', 'releaseYear']),
  query('sortOrder').optional().isIn(['asc', 'desc']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      search,
      type,
      genre,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = { userId: req.user._id };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (genre) {
      query.genre = genre;
    }

    if (status) {
      query.status = status;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const [items, totalCount] = await Promise.all([
      MediaItem.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      MediaItem.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.json({
      success: true,
      data: items,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: totalCount,
        itemsPerPage: parseInt(limit),
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/media/stats
// @desc    Get user's media statistics
// @access  Private
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await MediaItem.getUserStats(req.user._id);
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/media/:id
// @desc    Get single media item
// @access  Private
router.get('/:id', async (req, res, next) => {
  try {
    const item = await MediaItem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/media
// @desc    Create new media item
// @access  Private
router.post('/', [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('type')
    .isIn(['movie', 'show'])
    .withMessage('Type must be either movie or show'),
  body('genre')
    .isIn([
      'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
      'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance',
      'Sci-Fi', 'Thriller', 'War', 'Western', 'Other'
    ])
    .withMessage('Please select a valid genre'),
  body('status')
    .optional()
    .isIn(['watched', 'unwatched', 'watching'])
    .withMessage('Status must be watched, unwatched, or watching'),
  body('rating')
    .optional()
    .isFloat({ min: 1, max: 10 })
    .withMessage('Rating must be between 1 and 10'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  body('releaseYear')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 5 })
    .withMessage('Release year must be between 1900 and 5 years in the future'),
  body('poster')
    .optional()
    .isURL()
    .withMessage('Poster must be a valid URL'),
  body('imdbId')
    .optional()
    .trim()
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if item already exists for this user
    const existingItem = await MediaItem.findOne({
      userId: req.user._id,
      title: req.body.title,
      type: req.body.type
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'You already have this item in your watchlist'
      });
    }

    const mediaItem = new MediaItem({
      ...req.body,
      userId: req.user._id
    });

    await mediaItem.save();

    res.status(201).json({
      success: true,
      message: 'Media item created successfully',
      data: mediaItem
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/media/:id
// @desc    Update media item
// @access  Private
router.put('/:id', [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('type')
    .optional()
    .isIn(['movie', 'show'])
    .withMessage('Type must be either movie or show'),
  body('genre')
    .optional()
    .isIn([
      'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
      'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance',
      'Sci-Fi', 'Thriller', 'War', 'Western', 'Other'
    ])
    .withMessage('Please select a valid genre'),
  body('status')
    .optional()
    .isIn(['watched', 'unwatched', 'watching'])
    .withMessage('Status must be watched, unwatched, or watching'),
  body('rating')
    .optional()
    .isFloat({ min: 1, max: 10 })
    .withMessage('Rating must be between 1 and 10'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  body('releaseYear')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 5 })
    .withMessage('Release year must be between 1900 and 5 years in the future'),
  body('poster')
    .optional()
    .isURL()
    .withMessage('Poster must be a valid URL'),
  body('imdbId')
    .optional()
    .trim()
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const item = await MediaItem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      });
    }

    // Check for duplicate if title or type is being updated
    if (req.body.title || req.body.type) {
      const duplicateCheck = await MediaItem.findOne({
        userId: req.user._id,
        title: req.body.title || item.title,
        type: req.body.type || item.type,
        _id: { $ne: req.params.id }
      });

      if (duplicateCheck) {
        return res.status(400).json({
          success: false,
          message: 'You already have this item in your watchlist'
        });
      }
    }

    Object.assign(item, req.body);
    await item.save();

    res.json({
      success: true,
      message: 'Media item updated successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/media/:id/status
// @desc    Toggle watch status
// @access  Private
router.patch('/:id/status', async (req, res, next) => {
  try {
    const item = await MediaItem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      });
    }

    await item.toggleWatchStatus();

    res.json({
      success: true,
      message: 'Watch status updated successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/media/:id
// @desc    Delete media item
// @access  Private
router.delete('/:id', async (req, res, next) => {
  try {
    const item = await MediaItem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      });
    }

    await MediaItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Media item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/media
// @desc    Delete all media items for user
// @access  Private
router.delete('/', async (req, res, next) => {
  try {
    const result = await MediaItem.deleteMany({ userId: req.user._id });

    res.json({
      success: true,
      message: `${result.deletedCount} media items deleted successfully`
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;