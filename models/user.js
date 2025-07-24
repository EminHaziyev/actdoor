const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  displayName: String,
  accessToken: String,
  uniqueKey: { 
    type: String,
    default: () => "actd-"+Math.random().toString(36).substring(2, 50)
  },
  activity: {
    type: Object,
    default: () => ({
      folderName: "",
      fileName: "",
      time: 0,
      startTime: new Date(),
      updatedAt: new Date()
    })
  },
  message: {
    type: Boolean
  }
});

// Update updatedAt on activity change
userSchema.pre('save', function(next) {
  if (this.isModified('activity')) {
    this.updatedAt = new Date();
    if (this.activity && typeof this.activity === 'object') {
      this.activity.updatedAt = new Date();
    }
  }
  next();
});

// Add updatedAt field to schema
userSchema.add({
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

