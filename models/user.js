const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  displayName: String,
  accessToken: String,
  uniqueKey: { 
    type: String,
    default: () => Math.random().toString(36).substring(2, 25) 
  },
  activity: {
    type: Object,
    default: () => ({
      folderName: "",
      fileName: "",
      time: 0
    })
  }
  
});

module.exports = mongoose.model('User', userSchema);

