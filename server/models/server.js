const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');



class Server {
    constructor() {
        this.app = express();
        this.mongoose = mongoose;
        this.port = process.env.PORT;
        this.dbUrl = process.env.DB_URL;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(fileUpload());
        this.app.use(express.static(path.resolve(__dirname, '../../public')));
    }

    routes() {
        this.app.use('/api', require('../routes/index.router'));
    }

    listen() {
        this.mongoose.connect(this.dbUrl).then(() =>{
            console.log('Conectado a la base de datos');

            this.app.listen(this.port, () => {
                console.log(`Servidor corriendo en el puerto ${this.port}.`);
            });

        }).catch((err) => {
            console.log('Error al conectar a la base de datos', err);
        });
    }
}

module.exports = Server;
