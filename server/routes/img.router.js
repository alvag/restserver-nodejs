const express = require('express');
const app = express();
const imgCtrl = require('../controllers/img.controller');

app.get('/img/:tipo/:fileName', imgCtrl.get);

module.exports = app;
