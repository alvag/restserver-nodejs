const { successResponse, errorResponse } = require('../helpers/response.helper');
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
                        successResponse(res, { message: 'Archivo subido correctamente' });
                    }
                });
            }
        }
    }
};

const getExtension = (fileName) => {
    let arrName = fileName.split('.');
    return arrName[arrName.length - 1];
};



module.exports = {
    upload
};
