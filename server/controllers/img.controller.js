const fs = require('fs');
const path = require('path');

let noImagePath = path.resolve(__dirname, '../assets/img/no-image.jpg');

const get = (req, res) => {
    let tipo = req.params.tipo;
    let fileName = req.params.fileName;

    let pathFile = path.resolve(__dirname, `../../${process.env.UPLOAD_DIR}/${tipo}/${fileName}`);

    if (fs.existsSync(pathFile)) {
        res.sendFile(pathFile);
    } else {
        res.sendFile(noImagePath);
    }
};

module.exports = {
    get
};
