const express = require('express');
const app = express();
const imgCtrl = require('../controllers/img.controller');
const auth = require('../middlewares/auth');

app.get('/img/:tipo/:fileName', auth.checkTokenImg, imgCtrl.get);

module.exports = app;
