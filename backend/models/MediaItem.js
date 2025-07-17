const mongoose = require('mongoose');

const mediaItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title cannot be empty'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: ['movie', 'show'],
      message: 'Type must be either movie or show'
    }
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true,
    enum: {
      values: [
        'Action',
        'Adventure',
        'Animation',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'Horror',
        'Mystery',
        'Romance',
        'Sci-Fi',
        'Thriller',
        'War',
        'Western',
        'Other'
      ],
      message: 'Please select a valid genre'
    }
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['watched', 'unwatched', 'watching'],
      message: 'Status must be watched, unwatched, or watching'
    },
    default: 'unwatched'
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating cannot exceed 10'],
    default: null
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    default: ''
  },
  releaseYear: {
    type: Number,
    min: [1900, 'Release year must be after 1900'],
    max: [new Date().getFullYear() + 5, 'Release year cannot be more than 5 years in the future']
  },
  poster: {
    type: String,
    default: ''
  },
  imdbId: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
mediaItemSchema.index({ userId: 1, title: 1 });
mediaItemSchema.index({ userId: 1, type: 1 });
mediaItemSchema.index({ userId: 1, genre: 1 });
mediaItemSchema.index({ userId: 1, status: 1 });
mediaItemSchema.index({ userId: 1, createdAt: -1 });

// Virtual for formatted rating
mediaItemSchema.virtual('formattedRating').get(function() {
  return this.rating ? `${this.rating}/10` : 'Not rated';
});

// Instance method to toggle watch status
mediaItemSchema.methods.toggleWatchStatus = function() {
  this.status = this.status === 'watched' ? 'unwatched' : 'watched';
  this.updatedAt = new Date();
  return this.save();
};

// Static method to get user's statistics
mediaItemSchema.statics.getUserStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalItems: { $sum: 1 },
        watchedItems: {
          $sum: { $cond: [{ $eq: ['$status', 'watched'] }, 1, 0] }
        },
        unwatchedItems: {
          $sum: { $cond: [{ $eq: ['$status', 'unwatched'] }, 1, 0] }
        },
        watchingItems: {
          $sum: { $cond: [{ $eq: ['$status', 'watching'] }, 1, 0] }
        },
        movies: {
          $sum: { $cond: [{ $eq: ['$type', 'movie'] }, 1, 0] }
        },
        shows: {
          $sum: { $cond: [{ $eq: ['$type', 'show'] }, 1, 0] }
        },
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  return stats[0] || {
    totalItems: 0,
    watchedItems: 0,
    unwatchedItems: 0,
    watchingItems: 0,
    movies: 0,
    shows: 0,
    averageRating: 0
  };
};

module.exports = mongoose.model('MediaItem', mediaItemSchema);