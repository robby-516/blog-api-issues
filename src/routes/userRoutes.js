const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const { validateUser, validateId } = require('../middleware/validationMiddleware');
const { authMiddleware, generateToken } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/errorHandler');

router.post('/register', validateUser, asyncHandler(async (req, res) => {
  const user = await UserService.createUser(req.body);
  const token = generateToken(user);
  res.status(201).json({ user, token });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  const result = await UserService.authenticate(email, password);
  
  if (result.success) {
    const token = generateToken(result.user);
    res.json({ user: result.user, token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}));

router.get('/profile', authMiddleware, asyncHandler(async (req, res) => {
  const user = await UserService.getUserById(req.user.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
}));

router.get('/:id', validateId('id'), asyncHandler(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  delete user.password;
  res.json(user);
}));

router.put('/:id', authMiddleware, validateId('id'), asyncHandler(async (req, res) => {
  if (req.user.id != req.params.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  const updatedUser = await UserService.updateUser(req.params.id, req.body);
  
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(updatedUser);
}));

router.delete('/:id', authMiddleware, validateId('id'), asyncHandler(async (req, res) => {
  if (req.user.id !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
  
  const success = await UserService.deleteUser(req.params.id);
  
  if (success) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}));

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const users = await UserService.getAllUsers();
  users.forEach(user => delete user.password);
  res.json(users);
}));

module.exports = router;