# Movie/TV Show Tracker

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application that allows users to search, track, and manage their favorite movies and TV shows. Built with modern web technologies and best practices.

## 🎬 Features

### Core Features
- **User Authentication**: Secure JWT-based registration and login system
- **Personal Watchlist**: Add, edit, and delete movies and TV shows
- **Watch Status Management**: Mark items as watched, unwatched, or currently watching
- **Search & Filter**: Find content by title, genre, type, or status
- **Ratings & Reviews**: Rate movies/shows and add personal notes
- **Statistics Dashboard**: View personal viewing statistics
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Technical Features
- **Protected Routes**: Secure pages requiring authentication
- **Form Validation**: Client-side validation with React Hook Form & Yup
- **State Management**: Context API for global state management
- **Error Handling**: Comprehensive error handling with toast notifications
- **Loading States**: Beautiful loading indicators for better UX
- **API Integration**: RESTful API with Express.js and MongoDB

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router DOM** for navigation
- **React Hook Form** with Yup validation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate Limiting** for API protection

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/movie-tv-show-tracker.git
cd movie-tv-show-tracker
```

### 2. Install Dependencies

#### Install backend dependencies:
```bash
npm install
```

#### Install frontend dependencies:
```bash
cd frontend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/movie-tracker

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# Server Configuration
PORT=5000
NODE_ENV=development

# Client Configuration
CLIENT_URL=http://localhost:3000
```

### 4. Database Setup

Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud database)
# Update MONGODB_URI in .env with your Atlas connection string
```

### 5. Start the Application

#### Development Mode (runs both frontend and backend):
```bash
npm run dev
```

#### Or run separately:

**Backend:**
```bash
npm run server
```

**Frontend:**
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
movie-tv-show-tracker/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── MediaItem.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── media.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── .env
├── package.json
└── README.md
```

## 🔗 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Media Routes
- `GET /api/media` - Get user's media items (with filters)
- `POST /api/media` - Create new media item
- `GET /api/media/:id` - Get specific media item
- `PUT /api/media/:id` - Update media item
- `DELETE /api/media/:id` - Delete media item
- `PATCH /api/media/:id/status` - Toggle watch status
- `GET /api/media/stats` - Get user statistics

## 🎨 UI Components

### Pages
- **Home/Landing Page**: Welcome page with app overview
- **Login/Register**: Authentication forms
- **Dashboard**: User's personal watchlist with stats
- **Add/Edit Media**: Form for adding/editing movies and shows
- **Media Detail**: Detailed view of a specific media item
- **Search Results**: Filtered and searchable media list
- **404 Page**: Custom error page

### Components
- **Navigation**: Responsive navbar with user menu
- **MediaCard**: Individual media item display
- **SearchBar**: Search and filter functionality
- **StatsCard**: Statistics display components
- **LoadingSpinner**: Loading state indicators
- **Toast Notifications**: Success/error messages

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Server-side validation with express-validator
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Configured cross-origin resource sharing
- **Helmet**: Security headers for Express.js
- **Protected Routes**: Frontend route protection

## 🧪 Testing

Run the test suite:
```bash
# Frontend tests
cd frontend
npm test

# Backend tests (if implemented)
npm test
```

## 📈 Performance Optimizations

- **Code Splitting**: React lazy loading for better performance
- **Memoization**: React.memo and useMemo for optimized rendering
- **Debounced Search**: Optimized search input handling
- **Pagination**: Efficient data loading with pagination
- **MongoDB Indexing**: Database indexes for faster queries

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### Backend (Render/Heroku)
1. Create account on Render or Heroku
2. Connect GitHub repository
3. Configure environment variables
4. Deploy

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLIENT_URL=your-frontend-url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/yourusername/movie-tv-show-tracker/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

## 🔄 Future Enhancements

- [ ] Integration with TMDB/OMDb API for movie data
- [ ] Dark/Light theme toggle
- [ ] Export watchlist as CSV/PDF
- [ ] Social features (share lists, follow users)
- [ ] Mobile app with React Native
- [ ] Advanced filtering and sorting options
- [ ] Recommendation system
- [ ] Offline support with PWA

---

**Happy Tracking! 🎬📺**
