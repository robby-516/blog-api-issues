const express = require('express');
const router = express.Router();
const CommentService = require('../services/commentService');
const { validateId } = require('../middleware/validationMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/errorHandler');

router.get('/recent', asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const comments = await CommentService.getRecentComments(limit);
  res.json(comments);
}));

router.put('/:id', authMiddleware, validateId('id'), asyncHandler(async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  
  try {
    const comment = await CommentService.updateComment(
      req.params.id,
      req.user.id,
      text
    );
    res.json(comment);
  } catch (error) {
    if (error.message === 'Comment not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ error: error.message });
    }
    throw error;
  }
}));

router.delete('/:id', authMiddleware, validateId('id'), asyncHandler(async (req, res) => {
  const result = await CommentService.deleteComment(req.params.id, req.user.id);
  
  if (result.success) {
    res.json({ message: 'Comment deleted successfully' });
  } else {
    const status = result.message === 'Comment not found' ? 404 : 403;
    res.status(status).json({ error: result.message });
  }
}));

module.exports = router;