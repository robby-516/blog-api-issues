const express = require('express');
const router = express.Router();
const BlogService = require('../services/blogService');
const CommentService = require('../services/commentService');
const { validateBlog, validateComment, validateId } = require('../middleware/validationMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/errorHandler');

router.get('/', asyncHandler(async (req, res) => {
  const blogs = await BlogService.getAllBlogs();
  res.json(blogs);
}));

router.get('/search', asyncHandler(async (req, res) => {
  const { q } = req.query;
  const results = await BlogService.searchBlogs(q);
  res.json(results);
}));

router.get('/popular', asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const popularBlogs = await BlogService.getPopularBlogs(limit);
  res.json(popularBlogs);
}));

router.get('/:id', validateId('id'), asyncHandler(async (req, res) => {
  const blog = await BlogService.getBlogById(req.params.id);
  
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  
  res.json(blog);
}));

router.post('/', authMiddleware, validateBlog, asyncHandler(async (req, res) => {
  const blogData = {
    ...req.body,
    author: req.user.id
  };
  
  const blog = await BlogService.createBlog(blogData);
  res.status(201).json(blog);
}));

router.put('/:id', authMiddleware, validateId('id'), asyncHandler(async (req, res) => {
  const blog = await BlogService.getBlogById(req.params.id);
  
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  
  if (blog.author !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  const updatedBlog = await BlogService.updateBlog(req.params.id, req.body);
  res.json(updatedBlog);
}));

router.delete('/:id', authMiddleware, validateId('id'), asyncHandler(async (req, res) => {
  const blog = await BlogService.getBlogById(req.params.id);
  
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  
  if (blog.author != req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  const success = await BlogService.deleteBlog(req.params.id);
  
  if (success) {
    res.json({ message: 'Blog deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
}));

router.get('/author/:authorId', validateId('authorId'), asyncHandler(async (req, res) => {
  const blogs = await BlogService.getBlogsByAuthor(req.params.authorId);
  res.json(blogs);
}));

router.post('/:blogId/comments', authMiddleware, validateId('blogId'), validateComment, asyncHandler(async (req, res) => {
  const commentData = {
    blogId: parseInt(req.params.blogId),
    userId: req.user.id,
    text: req.body.text
  };
  
  const comment = await CommentService.addComment(commentData);
  res.status(201).json(comment);
}));

router.get('/:blogId/comments', validateId('blogId'), asyncHandler(async (req, res) => {
  const comments = await CommentService.getCommentsByBlogId(parseInt(req.params.blogId));
  res.json(comments);
}));

module.exports = router;