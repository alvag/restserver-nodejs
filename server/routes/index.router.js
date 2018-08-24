const express = require( 'express' );
const app = express();

app.use( require( './user.router' ) );
app.use( require( './login.router' ) );

module.exports = app;
