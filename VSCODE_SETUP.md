# VS Code Setup - Movie/TV Show Tracker

## Quick Setup Steps

1. **Open VS Code**
2. **Create new folder** for your project
3. **Copy all files** from the workspace to your local folder
4. **Open terminal** in VS Code (Ctrl + `)

## Install Dependencies

```bash
# Backend dependencies
npm install

# Frontend dependencies  
cd frontend
npm install
cd ..
```

## Setup Environment

Create `.env` file in root:
```
MONGODB_URI=mongodb://localhost:27017/movie-tracker
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## Start Application

```bash
npm run dev
```

## Access URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Recommended VS Code Extensions
- ES7+ React/Redux snippets
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- REST Client
- Prettier

That's it! Your Movie/TV Show Tracker is ready in VS Code!