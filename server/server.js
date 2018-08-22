require('./config/config');

const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(process.env.PORT, () => {
    console.log( `Servidor corriendo en el puerto ${process.env.PORT}.` );
});
