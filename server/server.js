require('./config/config');

const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;

    console.log( 'Conectado a la base de datos.' );
});

app.listen(process.env.PORT, () => {
    console.log( `Servidor corriendo en el puerto ${process.env.PORT}.` );
});
