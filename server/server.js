const path = require('path');
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index.router'));

// eslint-disable-next-line no-unused-vars
mongoose.connect(process.env.DB_URL).then(() =>{
    // eslint-disable-next-line no-console
    console.log('Conectado a la base de datos');

    app.listen(process.env.PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Servidor corriendo en el puerto ${process.env.PORT}.`);
    });

}).catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Error al conectar a la base de datos', err);
});
