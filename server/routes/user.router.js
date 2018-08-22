const express = require( 'express' );
const app = express();
const userController = require( '../controllers/user.controller' );

app.get( '/usuario', userController.get );
app.get( '/usuario/:id', userController.get );
app.post( '/usuario', userController.create );
app.put( '/usuario/:id', userController.update );
app.delete( '/usuario/:id', userController.del );

module.exports = app;
