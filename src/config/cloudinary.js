const cloudinary = require('cloudinary').v2;
const config = require ('./config.js')

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name:config.cloudinaryName ,
  api_key:config.cloudinaryApi ,
  api_secret:config.cloudinaryApiSecrete ,
});

module.exports = cloudinary;
