const express = require( 'express' );
const app = express();
const auth = require( '../middlewares/auth' );
const categoriaController = require( '../controllers/categoria.controller' );

app.get( '/categoria/:id?', auth.isAuth, categoriaController.get );
app.post( '/categoria/', auth.isAuth, categoriaController.create );
app.put( '/categoria/:id', auth.isAuth, categoriaController.update );
app.delete( '/categoria/:id', [ auth.isAuth, auth.isAdmin ], categoriaController.del );

module.exports = app;
