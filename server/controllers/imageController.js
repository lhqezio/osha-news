const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

const SAS_TOKEN = process.env.AZURE_SAS;
const CONTAINER_NAME = 'helloblob';
const STORAGE_ACCOUNT_NAME = process.env.storageressourcename || 'azuretest2142443';

const blobService = new BlobServiceClient(
  `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`
);

const PUBLIC_URL = 'https://azuretest2142443.blob.core.windows.net/helloblob/';

const containerClient = blobService.getContainerClient(CONTAINER_NAME);

module.exports.addImage = async (req, res) => {
  try {
    const imageName = req.files.file.name;
    const file = req.files.file;

    const blobClient = containerClient.getBlockBlobClient(imageName);

    const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
    await blobClient.uploadData(file.data, options); 
  
    res.status(201).json({
      'status': 'Image as successfully been added.',
      'url': PUBLIC_URL + imageName
    });
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};