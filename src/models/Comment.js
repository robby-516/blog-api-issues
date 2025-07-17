const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  // Issue 1: content/text field naming inconsistency
  text: {
    type: String,
    required: true,
    // Missing validation for minimum/maximum length
  },
  
  // Issue 2: Missing reference to blog post
  // blog: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Blog',
  //   required: true
  // },
  
  // Issue 3: author stored as embedded object instead of reference
  author: {
    name: String,
    email: String
    // Should be ObjectId reference to User model
  },
  
  // Issue 4: Missing parent comment reference for nested comments
  // parentComment: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Comment'
  // },
  
  // Issue 5: likes as simple number
  likes: {
    type: Number,
    default: 0
    // Should track which users liked (array of ObjectIds)
  },
  
  // Issue 6: Wrong field name and type for creation time
  postedOn: {
    type: String, // Should be Date
    default: Date.now().toString() // Wrong approach
  },
  
  // Issue 7: Missing important fields
  // - isDeleted (soft delete)
  // - editedAt
  // - status (approved/pending/spam)
  
  // Issue 8: Nested replies stored incorrectly
  replies: [String] // Should reference other comments or use proper structure
});

// Issue 9: Missing timestamps option
// { timestamps: true }

// Issue 10: Missing indexes
// commentSchema.index({ blog: 1, createdAt: -1 });

// Issue 11: Missing validation for spam/moderation
// Issue 12: Missing methods for vote tracking
// Issue 13: Missing virtual properties (e.g., isEdited)

// Issue 14: Wrong way to handle soft deletes
commentSchema.methods.delete = function() {
  // This actually deletes the document instead of soft delete
  return this.remove();
};

module.exports = mongoose.model('Comment', commentSchema);