const mongoose = require('mongoose');

const profileFileSchema = mongoose.Schema({
  id: String,
  key: String,
  fileName: String,
  mimeType: String,
});

const ProfileFile = mongoose.model('ProfileFile', profileFileSchema);

module.exports = { ProfileFile, profileFileSchema };
