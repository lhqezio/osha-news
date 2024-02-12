const DB = require('../db/db');
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

const sasToken = process.env.AZURE_SAS;
const containerName = 'helloblob';
const storageAccountName = process.env.storageressourcename || 'azuretest2142443';

const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
);

const publicUrl = 'https://azuretest2142443.blob.core.windows.net/helloblob/'

const containerClient = blobService.getContainerClient(containerName);

const db = new DB();

/**
 * Route method for "/user-image"
 * Get user images from database
 */
module.exports.getUserImages = async (req, res) => {
  try {
    // Get all user
    const userImages = await db.getUserImages({});
    // Remove the id from MongoDB
    const cleanUserImages = userImages.map((user) => {
      return {
        username: user.username,
        url: user.url
      };
    });

    res.status(200).json(cleanUserImages);
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};

/**
 * Route method for "/user-image"
 * Add user images to database
 */
module.exports.addUserImage = async (req, res) => {
    try {
      const userImage = req.files.file.name;
      const file = req.files.file;

      const blobClient = containerClient.getBlockBlobClient(userImage);

      const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
      await blobClient.uploadData(file.data, options); 
    
      await db.createUserImage({
        username: req.body.username,
        url: publicUrl + userImage,
      });
    
      res.status(201).json({'status': 'User Image as successfully been added.'});
    } catch (err) {
      res.status(500).json({'error': 'Internal Error.'});
    }
  };