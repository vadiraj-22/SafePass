import express from 'express';
import Password from '../models/Password.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all passwords for user
router.get('/', async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new password
router.post('/', async (req, res) => {
  try {
    const { website, username, password } = req.body;

    const newPassword = new Password({
      userId: req.user.userId,
      website,
      username,
      password
    });

    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update password
router.put('/:id', async (req, res) => {
  try {
    const { website, username, password } = req.body;

    const updatedPassword = await Password.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { website, username, password, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedPassword) {
      return res.status(404).json({ message: 'Password not found' });
    }

    res.json(updatedPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete password
router.delete('/:id', async (req, res) => {
  try {
    const deletedPassword = await Password.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!deletedPassword) {
      return res.status(404).json({ message: 'Password not found' });
    }

    res.json({ message: 'Password deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
