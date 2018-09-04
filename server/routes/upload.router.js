const express = require('express');
const fileUpload = require('express-fileupload');
const auth = require('../middlewares/auth');
const app = express();

app.use(fileUpload());

const uploadController = require('../controllers/upload.controller');

app.put('/upload/:tipo/:id', auth.isAuth, uploadController.upload);

module.exports = app;
