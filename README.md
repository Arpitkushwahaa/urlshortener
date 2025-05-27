# LinkBrief - URL Shortener

A modern URL shortener application built with React, Node.js, and MongoDB Atlas.

## Features

- Shorten long URLs to compact, shareable links
- Track clicks and analyze link performance
- Create custom short codes for branded links
- Responsive design that works on all devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Additional Tools**: nanoid, axios, react-hot-toast

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd url-shortener
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   ```
   # Copy the example .env file in the backend directory
   cp backend/.env.example backend/.env
   
   # Edit backend/.env and add your MongoDB Atlas connection string and other configuration
   ```

4. Start the development server:
   ```
   # Start both frontend and backend
   npm run dev:all
   
   # Or start them separately
   npm run dev          # Frontend
   npm run dev:server   # Backend
   ```

5. Open your browser and navigate to:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## API Endpoints

- `POST /api/shorten` - Create a new short URL
- `GET /:shortCode` - Redirect to the original URL
- `GET /api/analytics/:shortCode` - Get analytics for a specific URL
- `GET /api/urls` - Get all shortened URLs

## MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Set up a new cluster
3. Create a database user with read/write privileges
4. Add your IP to the IP Access List
5. Get your connection string and add it to the `.env` file

## Production Deployment

For production deployment:

1. Build the frontend:
   ```
   npm run build
   ```

2. Set up environment variables for production
3. Deploy the backend to your preferred hosting provider
4. Deploy the frontend static assets to a static hosting service

## License

MIT