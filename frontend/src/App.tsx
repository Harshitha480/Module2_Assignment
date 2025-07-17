import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { MediaProvider } from './contexts/MediaContext';

function App() {
  return (
    <AuthProvider>
      <MediaProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    🎬 Movie/TV Show Tracker
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    A full-stack MERN application for tracking your favorite movies and TV shows
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="text-lg font-semibold text-gray-900">🚀 Features</h3>
                    </div>
                    <div className="card-body">
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✅ User Authentication (JWT)</li>
                        <li>✅ Personal Watchlist Management</li>
                        <li>✅ Watch Status Tracking</li>
                        <li>✅ Search & Filter Functionality</li>
                        <li>✅ Ratings & Reviews</li>
                        <li>✅ Statistics Dashboard</li>
                        <li>✅ Responsive Design</li>
                      </ul>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h3 className="text-lg font-semibold text-gray-900">🛠️ Tech Stack</h3>
                    </div>
                    <div className="card-body">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900">Frontend</h4>
                          <p className="text-sm text-gray-600">React, TypeScript, Tailwind CSS</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Backend</h4>
                          <p className="text-sm text-gray-600">Node.js, Express.js, MongoDB</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Tools</h4>
                          <p className="text-sm text-gray-600">JWT, React Hook Form, Axios</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-semibold text-gray-900">🏗️ Project Structure</h3>
                  </div>
                  <div className="card-body">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`movie-tv-show-tracker/
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
│   │   └── types/
│   └── package.json
├── .env
└── README.md`}</pre>
                    </div>
                  </div>
                </div>

                <div className="card mt-8">
                  <div className="card-header">
                    <h3 className="text-lg font-semibold text-gray-900">🚀 Getting Started</h3>
                  </div>
                  <div className="card-body">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">1. Install Dependencies</h4>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <code className="text-sm">npm install && cd frontend && npm install</code>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">2. Setup Environment</h4>
                        <p className="text-sm text-gray-600">Configure your .env file with MongoDB URI and JWT secret</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">3. Start Development</h4>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <code className="text-sm">npm run dev</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8 space-y-4">
                  <div className="flex justify-center space-x-4">
                    <button className="btn-primary">
                      🔗 View API Documentation
                    </button>
                    <button className="btn-secondary">
                      📖 Read Full README
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    This is a demonstration of the Movie/TV Show Tracker application structure.
                    <br />
                    The complete application includes authentication, CRUD operations, and more!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Router>
        <Toaster position="top-right" />
      </MediaProvider>
    </AuthProvider>
  );
}

export default App;
