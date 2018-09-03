const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

const uploadController = require('../controllers/upload.controller');

app.put('/upload/:tipo/:id', uploadController.upload);

module.exports = app;
