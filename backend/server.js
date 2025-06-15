import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
dotenv.config({ path: join(__dirname, '.env') });

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'https://urlwebshortener.netlify.app' // Your deployed frontend URL
  ],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define URL schema
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

// Create URL model
const Url = mongoose.model('Url', urlSchema);

// Routes
app.post('/api/shorten', async (req, res) => {
  try {
    const { originalUrl, customCode } = req.body;
    
    // Validate URL
    try {
      new URL(originalUrl);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    // Validate custom code
    if (customCode && (customCode.length < 4 || customCode.length > 10)) {
      return res.status(400).json({ error: 'Custom code must be between 4 and 10 characters' });
    }
    
    // Generate or use custom short code
    const shortCode = customCode || nanoid(6);

    // Check if custom code already exists
    if (customCode) {
      const existingUrl = await Url.findOne({ shortCode: customCode });
      if (existingUrl) {
        return res.status(400).json({ error: 'This custom code is already in use' });
      }
    }

    // Create and save new URL document
    const url = new Url({
      originalUrl,
      shortCode,
    });

    await url.save();

    return res.status(201).json({
      shortUrl: ${process.env.BASE_URL}/${shortCode},
      shortCode,
      originalUrl,
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return res.status(500).json({ error: 'Server error, please try again' });
  }
});

// Redirect route
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    const url = await Url.findOne({ shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment clicks
    url.clicks += 1;
    await url.save();
    
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get URL analytics
app.get('/api/analytics/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    const url = await Url.findOne({ shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    
    return res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: ${process.env.BASE_URL}/${url.shortCode},
      createdAt: url.createdAt,
      clicks: url.clicks,
    });
  } catch (error) {
    console.error('Error getting URL analytics:', error);
    return res.status(500).json({ error: 'Server error, please try again' });
  }
});

// Add endpoint to get recent URLs
app.get('/api/urls', async (req, res) => {
  try {
    const recentUrls = await Url.find()
      .sort({ createdAt: -1 })
      .limit(10);
    
    const formattedUrls = recentUrls.map(url => ({
      shortUrl: ${process.env.BASE_URL}/${url.shortCode},
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt
    }));
    
    res.json(formattedUrls);
  } catch (error) {
    console.error('Error fetching recent URLs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});
