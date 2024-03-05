const express = require('request');
const router = express.Router();

router.post('login', loginController);