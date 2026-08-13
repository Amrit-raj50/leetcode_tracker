const express = require('express');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// POST /api/sync-extension
router.post('/sync-extension', authenticate, async (req, res) => {
  try {
    const { solvedSlugs, totalSolved, leetcodeUsername } = req.body;

    // Validate input
    if (!Array.isArray(solvedSlugs)) {
      return res.status(400).json({ error: 'solvedSlugs must be an array' });
    }

    // Get the authenticated user from req.user (set by middleware)
    const user = req.user;

    // Update user's LeetCode data
    user.solvedSlugs = solvedSlugs;
    user.totalSolved = totalSolved || solvedSlugs.length;
    if (leetcodeUsername) {
      user.leetcodeUsername = leetcodeUsername;
    }
    user.lastSynced = new Date();

    await user.save();

    res.json({
      success: true,
      message: `Synced ${solvedSlugs.length} questions`,
      totalSolved: user.totalSolved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sync failed' });
  }
});

// Optional: GET /api/me – get current user info (including token hint)
router.get('/me', authenticate, async (req, res) => {
  const user = req.user.toObject();
  delete user.password;
  res.json({ user });
});

module.exports = router;