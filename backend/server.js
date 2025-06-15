import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Fix: derive __dirname from __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env
dotenv.config({ path: join(__dirname, '.env') });

const app = express();

// CORS
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'https://urlwebshortener.netlify.app'
  ],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// URL Schema & Model
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode:   { type: String, required: true, unique: true },
  createdAt:   { type: Date,   default: Date.now },
  clicks:      { type: Number, default: 0 },
});
const Url = mongoose.model('Url', urlSchema);

// POST /api/shorten
app.post('/api/shorten', async (req, res) => {
  try {
    const { originalUrl, customCode } = req.body;

    // Validate URL
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    // Validate custom code length
    if (customCode && (customCode.length < 4 || customCode.length > 10)) {
      return res.status(400).json({ error: 'Custom code must be between 4 and 10 characters' });
    }

    const shortCode = customCode || nanoid(6);

    // Check for existing custom code
    if (customCode) {
      const existing = await Url.findOne({ shortCode: customCode });
      if (existing) {
        return res.status(400).json({ error: 'This custom code is already in use' });
      }
    }

    // Save new URL
    const url = new Url({ originalUrl, shortCode });
    await url.save();

    return res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      shortCode,
      originalUrl,
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return res.status(500).json({ error: 'Server error, please try again' });
  }
});

// GET /:shortCode (redirect)
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/analytics/:shortCode
app.get('/api/analytics/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    return res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      createdAt: url.createdAt,
      clicks: url.clicks,
    });
  } catch (error) {
    console.error('Error getting URL analytics:', error);
    return res.status(500).json({ error: 'Server error, please try again' });
  }
});

// GET /api/urls (recent)
app.get('/api/urls', async (_req, res) => {
  try {
    const recentUrls = await Url.find().sort({ createdAt: -1 }).limit(10);
    const formatted = recentUrls.map(u => ({
      shortUrl: `${process.env.BASE_URL}/${u.shortCode}`,
      shortCode: u.shortCode,
      originalUrl: u.originalUrl,
      clicks: u.clicks,
      createdAt: u.createdAt,
    }));
    return res.json(formatted);
  } catch (error) {
    console.error('Error fetching recent URLs:', error);
    return res.status(500).json({ error: 'Server error, please try again' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
