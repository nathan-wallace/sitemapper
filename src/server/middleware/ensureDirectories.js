import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../../config/config.js';

// Get the current directory name for relative paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware to ensure cache and upload directories exist
// Adapted from your original ensureDirectories function in index.js
export async function ensureDirectories(req, res, next) {
  try {
    // Create cache directory if it doesn’t exist
    await fs.mkdir(config.cacheDir, { recursive: true });
    // Create uploads directory if it doesn’t exist
    await fs.mkdir(config.uploadDir, { recursive: true });
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Failed to create directories:', err);
    res.status(500).json({ error: 'Server setup failed' });
  }
}