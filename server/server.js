require('./config/config');

const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
mongoose.set( 'useFindAndModify', false );
const bodyParser = require( 'body-parser' );

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use( require( './routes/user.router' ) );

mongoose.connect( process.env.URL_DB, { useNewUrlParser: true }, ( err, res ) => {
    if (err) throw err;

    console.log( 'Conectado a la base de datos.' );
});

// test

app.listen(process.env.PORT, () => {
    console.log( `Servidor corriendo en el puerto ${process.env.PORT}.` );
});
