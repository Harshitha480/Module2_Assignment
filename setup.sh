#!/bin/bash

echo "🎬 Movie/TV Show Tracker - VS Code Setup"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️ Creating .env file..."
    cat > .env << EOL
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
EOL
    echo "✅ .env file created"
else
    echo "⚙️ .env file already exists"
fi

echo ""
echo "🚀 Setup complete! To start the application:"
echo "   npm run dev"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📝 Don't forget to:"
echo "   1. Install MongoDB or set up MongoDB Atlas"
echo "   2. Update MONGODB_URI in .env if needed"
echo "   3. Install recommended VS Code extensions"
echo ""
echo "Happy coding! 🎬📺"