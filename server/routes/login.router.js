const express = require( 'express' );
const app = express();
const loginController = require( '../controllers/login.controller' );

app.post('/login', loginController.login);

module.exports = app;
