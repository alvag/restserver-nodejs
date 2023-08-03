const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();

        this.dbConnection();

        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        await dbConnection();
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
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}.`);
        });
    }
}

module.exports = Server;
