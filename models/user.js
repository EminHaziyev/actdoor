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
      updatedAt: new Date()
    })
  },
  message: {
    type: Boolean
  },
  updatedAt:{
    default: new Date()
  } 
});

userSchema.pre('save', function (next) {
  if (this.isModified('activity')) {
    this.updatedAt = new Date();
  }
  next();
});


module.exports = mongoose.model('User', userSchema);

