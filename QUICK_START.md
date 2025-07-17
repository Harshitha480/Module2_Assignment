# 🚀 Quick Start Guide - VS Code

## Step 1: Copy Project to VS Code

1. **Create a new folder** on your computer (e.g., `movie-tv-tracker`)
2. **Copy all files** from this workspace to your new folder
3. **Open VS Code**
4. **File → Open Folder** → Select your project folder

## Step 2: Install Dependencies

Open VS Code terminal (`Ctrl + `` or `View → Terminal`) and run:

### Option A: Use Setup Script
```bash
# For Windows
setup.bat

# For Mac/Linux
chmod +x setup.sh
./setup.sh
```

### Option B: Manual Installation
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Step 3: Setup Database

### Quick Option: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` file with your connection string

### Local Option: Install MongoDB
- Download from [MongoDB.com](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service

## Step 4: Start Application

```bash
npm run dev
```

## Step 5: Open in Browser

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 What You'll See

1. **Landing Page** - Project overview and features
2. **Authentication** - Register/Login system
3. **Dashboard** - Your personal watchlist
4. **Add Media** - Add movies and TV shows
5. **Search & Filter** - Find your content easily

## 🔧 VS Code Extensions (Recommended)

Install these for better development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **Auto Rename Tag**
4. **MongoDB for VS Code**
5. **REST Client**
6. **Prettier - Code formatter**
7. **ESLint**

## 📁 Project Structure

```
movie-tv-tracker/
├── backend/           # Node.js + Express server
│   ├── models/        # Database schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Authentication & error handling
│   └── server.js      # Main server file
├── frontend/          # React + TypeScript app
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/  # State management
│   │   ├── pages/
│   │   ├── services/  # API calls
│   │   └── types/     # TypeScript types
│   └── public/
├── .env              # Environment variables
└── package.json      # Dependencies
```

## 🚨 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000 or 5000
npx kill-port 3000
npx kill-port 5000
```

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas: check IP whitelist

### Dependencies Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🎨 Customization

The app is fully customizable:

- **Colors**: Edit `tailwind.config.js`
- **Components**: Modify files in `frontend/src/components/`
- **API**: Add new endpoints in `backend/routes/`
- **Database**: Modify schemas in `backend/models/`

## 📱 Features to Try

1. **Register** a new account
2. **Add movies/shows** to your watchlist
3. **Mark items** as watched/unwatched
4. **Rate and review** your content
5. **Search and filter** your collection
6. **View statistics** on your dashboard

## 🔄 Development Workflow

1. **Backend changes**: Server auto-restarts with nodemon
2. **Frontend changes**: Hot reload in browser
3. **Database changes**: Restart server if needed
4. **New dependencies**: Run `npm install` again

## 🚀 Next Steps

- Explore the codebase
- Add new features
- Customize the UI
- Deploy to production
- Add more functionality

---

**You're all set! Start building your movie collection! 🎬📺**