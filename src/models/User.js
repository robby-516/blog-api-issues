const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Issue 1: username field is missing unique constraint
  username: {
    type: String,
    required: true,
    // unique: true should be here
  },
  
  // Issue 2: email validation is missing
  email: {
    type: String,
    required: true,
    // Missing email validation and unique constraint
  },
  
  // Issue 3: password is stored as plain text (no hashing mentioned)
  password: {
    type: String,
    required: true,
    // Should have minlength validation
  },
  
  // Issue 4: firstName and lastName should probably be here
  fullName: {
    type: String,
    // This could be split into firstName and lastName
  },
  
  // Issue 5: Missing important fields like role/isAdmin
  // role: { type: String, enum: ['user', 'admin'], default: 'user' }
  
  // Issue 6: Wrong type for createdAt (should use timestamps option)
  createdAt: {
    type: String, // Should be Date
    default: new Date().toString() // Wrong approach
  },
  
  // Issue 7: Missing updatedAt field
});

// Issue 8: Missing timestamps option in schema
// Should have: { timestamps: true }

// Issue 9: Missing useful virtual properties like fullName
// Issue 10: Missing methods for password hashing/comparison

module.exports = mongoose.model('User', userSchema);