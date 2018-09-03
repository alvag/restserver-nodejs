const express = require('express');
const app = express();

app.use(require('./user.router'));
app.use(require('./login.router'));
app.use(require('./categoria.router'));
app.use(require('./producto.router'));

module.exports = app;
