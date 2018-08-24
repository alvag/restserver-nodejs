const express = require( 'express' );
const app = express();
const userController = require( '../controllers/user.controller' );
const auth = require( '../middlewares/auth' );

app.get( '/usuario', auth.isAuth, userController.get );
app.get( '/usuario/:id', auth.isAuth, userController.get );
app.post( '/usuario', [ auth.isAuth, auth.isAdmin ], userController.create );
app.put( '/usuario/:id', [ auth.isAuth, auth.isAdmin ], userController.update );
app.delete( '/usuario/:id', [ auth.isAuth, auth.isAdmin ], userController.del );

module.exports = app;
