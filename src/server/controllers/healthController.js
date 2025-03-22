import express from 'express';

// Create a router for health-related endpoints
const router = express.Router();

// Health check endpoint from your original index.js
// Returns server status and uptime for monitoring purposes
router.get('/', (req, res) => {
  res.json({
    status: 'OK',           // Indicates the server is running
    uptime: process.uptime(), // Uptime in seconds since server started
  });
});

// Export the router for use in src/server/index.js
export { router };