const { successResponse, errorResponse } = require('../helpers/response.helper');
const validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

const upload = (req, res) => {
    if (!req.files) {
        errorResponse(res, { message: 'No existen archivos para subir' });
    } else {
        let archivo = req.files.archivo;

        if (!isValidFile(archivo.name)) {
            errorResponse(res, { message: `Sólo se permiten archivos de tipo: ${validExtensions.join(', ')}` });
        } else {
            archivo.mv(`${process.env.UPLOAD_DIR}/${archivo.name}`, (error) => {
                if (error) {
                    errorResponse(res, error);
                } else {
                    successResponse(res, { message: 'Archivo subido correctamente' });
                }
            });
        }
    }
};

const isValidFile = (fileName) => {
    let arrName = fileName.split('.');
    let ext = arrName[arrName.length - 1];
    return validExtensions.includes(ext);
};



module.exports = {
    upload
};
