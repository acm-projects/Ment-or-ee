require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage'); // Use GridFsStorage for file uploads
const multer = require('multer');
const { GridFSBucket } = require('mongodb');

const router = express.Router();

// Set up GridFS storage
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname, // Save the file with its original name
      bucketName: 'uploads' // Files will be stored in the 'uploads' collection
    };
  }
});

// Set up Multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 5000000 } // 5MB limit for file uploads
});

// Upload a single file route
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.error('File upload failed or no file received');
    return res.status(500).json({ message: 'File upload failed' });
  }

  console.log('File object:', req.file); // Log the uploaded file details

  // Send back the file metadata as a response
  res.json({ file: req.file });
});

// Retrieve all files from GridFS
router.get('/files', async (req, res) => {
  try {
    const conn = mongoose.connection.db;
    const files = await conn.collection('uploads.files').find({}).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found' });
    }

    // Filter only image files to avoid CORB issues
    const imageFiles = files.filter(file => file.contentType && file.contentType.startsWith('image/'));
    res.json(imageFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving files' });
  }
});

// Retrieve a specific file by filename
router.get('/files/:filename', async (req, res) => {
  try {
    const conn = mongoose.connection.db;
    const bucket = new GridFSBucket(conn, { bucketName: 'uploads' });

    const file = await conn.collection('uploads.files').findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Set the Content-Type header to serve the image correctly
    res.setHeader('Content-Type', file.contentType);
    res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`); // Optional for inline display

    // If the file exists, stream it to the client
    const downloadStream = bucket.openDownloadStream(file._id);
    downloadStream.on('error', (error) => {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving file' });
    });
    downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving file' });
  }
});

// Delete a file by filename
router.delete('/files/:filename', async (req, res) => {
  try {
    const conn = mongoose.connection.db;
    const bucket = new GridFSBucket(conn, { bucketName: 'uploads' });

    const file = await conn.collection('uploads.files').findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    await bucket.delete(file._id);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting file' });
  }
});

// At the bottom of your files.routes.js file
module.exports = router;
