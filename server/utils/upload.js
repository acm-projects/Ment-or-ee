// upload.js
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
require('dotenv').config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads',
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
});

module.exports = upload; // Just export the upload instance directly
