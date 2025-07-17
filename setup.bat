@echo off
echo 🎬 Movie/TV Show Tracker - VS Code Setup
echo ========================================

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

:: Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

:: Install backend dependencies
echo 📦 Installing backend dependencies...
npm install

:: Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
npm install
cd ..

:: Create .env file if it doesn't exist
if not exist .env (
    echo ⚙️ Creating .env file...
    echo # Database Configuration > .env
    echo MONGODB_URI=mongodb://localhost:27017/movie-tracker >> .env
    echo. >> .env
    echo # JWT Configuration >> .env
    echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production >> .env
    echo JWT_EXPIRE=30d >> .env
    echo. >> .env
    echo # Server Configuration >> .env
    echo PORT=5000 >> .env
    echo NODE_ENV=development >> .env
    echo. >> .env
    echo # Client Configuration >> .env
    echo CLIENT_URL=http://localhost:3000 >> .env
    echo ✅ .env file created
) else (
    echo ⚙️ .env file already exists
)

echo.
echo 🚀 Setup complete! To start the application:
echo    npm run dev
echo.
echo 🌐 Access URLs:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo 📝 Don't forget to:
echo    1. Install MongoDB or set up MongoDB Atlas
echo    2. Update MONGODB_URI in .env if needed
echo    3. Install recommended VS Code extensions
echo.
echo Happy coding! 🎬📺
pause