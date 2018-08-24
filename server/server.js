const path = require( 'path' );
require( 'dotenv' ).config();
require('./config/config');

const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
mongoose.set( 'useFindAndModify', false );

const bodyParser = require( 'body-parser' );

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use( express.static( path.resolve( __dirname, '../public' ) ) );

app.use( require( './routes/index.router' ) );

mongoose.connect( process.env.DB_URL, { useNewUrlParser: true }, ( err, res ) => {
    if (err) throw err;

    console.log( 'Conectado a la base de datos.' );


    app.listen( process.env.PORT, () => {
        console.log( `Servidor corriendo en el puerto ${process.env.PORT}.` );
    } );

});
