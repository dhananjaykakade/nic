const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_uploads',  // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf'],  // File types allowed
    transformation: [{ width: 500, height: 500, crop: 'limit' }],  // Optional: resize images
  },
});

// Set up multer with the cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;
