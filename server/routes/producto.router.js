const express = require('express');
const app = express();
const auth = require('../middlewares/auth');
const productoController = require('../controllers/producto.controller');

app.get('/producto/:id?', auth.isAuth, productoController.get);
app.get('/producto/buscar/:q?', auth.isAuth, productoController.search);
app.post('/producto/', auth.isAuth, productoController.create);
app.put('/producto/:id', auth.isAuth, productoController.update);
app.delete('/producto/:id', [auth.isAuth, auth.isAdmin], productoController.del);

module.exports = app;
