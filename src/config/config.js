const dotenvFlow = require('dotenv');

// Load the environment variables
dotenvFlow.config();

// Export the variables
module.exports = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  apiKey: process.env.API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  cloudinaryApi:process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecrete:process.env.CLOUDINARY_API_SECRET,
  cloudinaryName:process.env.CLOUDINARY_CLOUD_NAME,
};
