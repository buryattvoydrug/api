const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'buryattvoydrug',
  api_key: '681573696947176',
  api_secret: 'mVkKci7c3DyBnAivmOdtYAn_8qQ',
});

module.exports = cloudinary;