# Movie/TV Show Tracker - Setup Guide

This guide will help you set up the Movie/TV Show Tracker application on your local machine.

## 📋 Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-tv-show-tracker.git
cd movie-tv-show-tracker
```

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup

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

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb/brew/mongodb-community
   
   # On Windows
   net start MongoDB
   
   # On Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` with your Atlas connection string

### 5. Start the Application

```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
# Backend only
npm run server

# Frontend only (in another terminal)
npm run client
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🔧 Development Commands

```bash
# Start development servers
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client

# Build frontend for production
npm run build

# Install all dependencies
npm run install-all
```

## 📁 Project Structure

```
movie-tv-show-tracker/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model schema
│   │   └── MediaItem.js     # Media item model schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── media.js         # Media CRUD routes
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   └── errorHandler.js  # Error handling middleware
│   └── server.js            # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── contexts/        # React Context providers
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── .env                     # Environment variables
├── package.json             # Backend dependencies
├── README.md               # Main documentation
└── SETUP.md                # This setup guide
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/movie-tracker` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key` |
| `JWT_EXPIRE` | JWT token expiration time | `30d` |
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🧪 Testing the Setup

### 1. Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Should return:
# {"status":"OK","timestamp":"2024-01-01T00:00:00.000Z"}
```

### 2. Test Frontend

Visit http://localhost:3000 - you should see the application landing page.

### 3. Test Database Connection

Check your terminal for:
```
MongoDB connected successfully
Server running on port 5000
```

## 🚨 Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution**: 
- Ensure MongoDB is running locally
- Check your `MONGODB_URI` in `.env`
- For Atlas, verify your connection string and IP whitelist

### Issue: Port Already in Use
**Solution**:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

### Issue: npm Install Errors
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Frontend Won't Start
**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Media Management
- `GET /api/media` - Get user's media items
- `POST /api/media` - Create new media item
- `PUT /api/media/:id` - Update media item
- `DELETE /api/media/:id` - Delete media item
- `PATCH /api/media/:id/status` - Toggle watch status

## 🎨 Frontend Features

- **Authentication**: Login/Register forms
- **Dashboard**: Personal watchlist with statistics
- **Media Management**: Add, edit, delete movies/shows
- **Search & Filter**: Find content by various criteria
- **Responsive Design**: Mobile-friendly interface
- **Toast Notifications**: User feedback messages

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation
- Rate limiting
- CORS protection
- Security headers with Helmet

## 📱 Next Steps

After successful setup, you can:

1. **Register a new account** at http://localhost:3000
2. **Add your first movie/show** to your watchlist
3. **Explore the dashboard** to see your statistics
4. **Test the search and filter** functionality
5. **Customize the application** to your needs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues:

1. Check this setup guide
2. Review the main [README.md](README.md)
3. Check the [Issues](https://github.com/yourusername/movie-tv-show-tracker/issues) page
4. Create a new issue with detailed information

---

**Happy coding! 🎬📺**