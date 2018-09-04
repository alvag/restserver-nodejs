const _ = require('underscore');
const Producto = require('../models/producto.model');
const { errorResponse, successResponse } = require('../helpers/response.helper');
const paginacion = require('../helpers/paginacion.helper');

const get = (req, res) => {
    let _id = req.params.id;

    if (_id) {
        Producto.findOne({ _id })
            .populate('user', 'name email')
            .populate('categoria', 'descripcion')
            .exec((error, producto) => {
                if (error) {
                    errorResponse(res, error, 500);
                } else if (!producto) {
                    errorResponse(res, { message: 'Producto no encontrado' });
                } else {
                    successResponse(res, { producto });
                }
            });
    } else {
        listarProductos(res, req);
    }
};

const create = (req, res) => {
    let prod = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        stock: req.body.stock,
        disponible: req.body.stock > 0,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        user: req.user._id
    });

    Producto.findOne({ nombre: prod.nombre }, (error, producto) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (producto) {
            errorResponse(res, { message: 'Ya existe un producto con el mismo nombre.' });
        } else {
            prod.save((error, producto) => {
                if (error) {
                    errorResponse(res, error);
                } else {
                    successResponse(res, { producto }, 201);
                }
            });
        }
    });
};

const update = (req, res) => {
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'stock', 'categoria', 'img']);
    let _id = req.params.id;

    Producto.findOne({ nombre: body.nombre }, (error, productoDB) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (!productoDB) {
            errorResponse(res, { message: 'No existe ningún producto con ese ID.' }, 400);
        } else if (productoDB && productoDB._id !== _id) {
            errorResponse(res, { message: 'Ya existe un producto con el mismo nombre.' });
        } else {
            Producto.findOneAndUpdate({ _id }, body, { new: true, runValidators: true }, (error, producto) => {
                if (error) {
                    errorResponse(res, error);
                } else {
                    successResponse(res, { producto });
                }
            });
        }

    });
};

const del = (req, res) => {
    let _id = req.params.id;

    Producto.findOneAndRemove({ _id }, (error, producto) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (!producto) {
            errorResponse(res, { message: 'No existe ningún producto con ese ID.' }, 400);
        } else {
            successResponse(res, { producto });
        }
    });
};

const search = (req, res) => {
    let q = req.params.q;
    let regEx = new RegExp(q, 'i');
    let filter = { nombre: regEx };
    listarProductos(res, req, filter);
};

const listarProductos = (res, req, filter = {}) => {

    let pag = Number(req.query.pag) || 1;
    let cant = Number(req.query.cant) || 10;

    Producto.find(filter)
        .populate('user', 'name email')
        .populate('categoria', 'descripcion')
        .limit(cant)
        .skip((pag - 1) * cant)
        .exec((error, productos) => {
            if (error) {
                errorResponse(res, error, 500);
            } else {
                Producto.countDocuments(filter, (err, total) => {
                    if (err) {
                        errorResponse(res, err, 500);
                    } else {
                        successResponse(res, { paginacion: paginacion.paginar(req.path, total, pag, cant), productos });
                    }
                });
            }
        });
};

module.exports = {
    get,
    create,
    update,
    del,
    search
};
