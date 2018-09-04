const fs = require('fs');
const path = require('path');
const { successResponse, errorResponse } = require('../helpers/response.helper');
const User = require('../models/user.model');
const Producto = require('../models/producto.model');
const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
const tiposValidos = ['productos', 'usuarios'];

const upload = (req, res) => {
    if (!req.files) {
        errorResponse(res, { message: 'No existen archivos para subir' });
    } else {
        let tipo = req.params.tipo;
        let _id = req.params.id;
        let archivo = req.files.archivo;

        if (!tiposValidos.includes(tipo)) {
            errorResponse(res, { message: `Los tipos permitidos son: ${tiposValidos.join(', ')}` });
        } else {
            if (!extensionesValidas.includes(getExtension(archivo.name))) {
                errorResponse(res, { message: `Sólo se permiten archivos de tipo: ${extensionesValidas.join(', ')}` });
            } else {

                let fileName = `${_id}-${new Date().getTime()}.${getExtension(archivo.name)}`;

                archivo.mv(`${process.env.UPLOAD_DIR}/${tipo}/${fileName}`, (error) => {
                    if (error) {
                        errorResponse(res, error);
                    } else {
                        if (tipo === 'usuarios') {
                            updateImgUser(res, _id, fileName);
                        } else if (tipo === 'productos') {
                            updateImgProducto(res, _id, fileName);
                        }
                    }
                });
            }
        }
    }
};

const updateImgUser = (res, _id, fileName) => {
    User.findOne({ _id }, 'name email role isActive google img', (error, userDB) => {
        if (error) {
            errorResponse(res, error, 500);
            deleteFile('usuarios', fileName);
        } else if (!userDB) {
            errorResponse(res, { message: 'Usuario no encontrado' });
            deleteFile('usuarios', fileName);
        } else {
            let oldImg = userDB.img;
            userDB.img = fileName;
            userDB.save((error, user) => {
                if (error) {
                    errorResponse(res, error, 500);
                    deleteFile('usuarios', fileName);
                } else {
                    successResponse(res, { user });
                    deleteFile('usuarios', oldImg);
                }
            });
        }
    });
};

const updateImgProducto = (res, _id, fileName) => {
    Producto.findOne({ _id }, (error, producto) => {
        if (error) {
            errorResponse(res, error, 500);
            deleteFile('productos', fileName);
        } else if (!producto) {
            errorResponse(res, { message: 'Usuario no encontrado' });
            deleteFile('productos', fileName);
        } else {
            let oldImg = producto.img;
            producto.img = fileName;
            producto.save((error, producto) => {
                if (error) {
                    errorResponse(res, error, 500);
                    deleteFile('productos', fileName);
                } else {
                    successResponse(res, { producto });
                    deleteFile('productos', oldImg);
                }
            });
        }
    });
};

const getExtension = (fileName) => {
    let arrName = fileName.split('.');
    return arrName[arrName.length - 1];
};

const deleteFile = (directory, fileName) => {
    let pathFile = path.resolve(__dirname, `../../${process.env.UPLOAD_DIR}/${directory}/${fileName}`);
    if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
    }
};

module.exports = {
    upload
};
