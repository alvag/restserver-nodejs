const express = require( 'express' );
const app = express();

app.use( require( './user.router' ) );
app.use( require( './login.router' ) );
app.use( require( './categoria.router' ) );

module.exports = app;
