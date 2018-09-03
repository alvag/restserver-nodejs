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
            .exec((error, productoDB) => {
                if (error) {
                    errorResponse(res, error, 500);
                } else if (!productoDB) {
                    errorResponse(res, { message: 'Producto no encontrado' });
                } else {
                    successResponse(res, { productoDB });
                }
            });
    } else {
        listarProductos(res, req);
    }
};

const create = (req, res) => {
    let producto = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        stock: req.body.stock,
        disponible: req.body.stock > 0,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        user: req.user._id
    });

    Producto.findOne({ nombre: producto.nombre }, (error, productoDB) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (productoDB) {
            errorResponse(res, { message: 'Ya existe un producto con el mismo nombre.' });
        } else {
            producto.save((error, productoDB) => {
                if (error) {
                    errorResponse(res, error);
                } else {
                    successResponse(res, { productoDB }, 201);
                }
            });
        }
    });
};

const update = (req, res) => {
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'stock', 'categoria']);
    let _id = req.params.id;

    Producto.findOne({ nombre: body.nombre }, (error, productoDB) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (!productoDB) {
            errorResponse(res, { message: 'No existe ningún producto con ese ID.' }, 400);
        } else if (productoDB && productoDB._id != _id) {
            errorResponse(res, { message: 'Ya existe un producto con el mismo nombre.' });
        } else {
            Producto.findOneAndUpdate({ _id }, body, { new: true, runValidators: true }, (error, productoDB) => {
                if (error) {
                    errorResponse(res, error);
                } else {
                    successResponse(res, { productoDB });
                }
            });
        }

    });
};

const del = (req, res) => {
    let _id = req.params.id;

    Producto.findOneAndRemove({ _id }, (error, productoDB) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (!productoDB) {
            errorResponse(res, { message: 'No existe ningún producto con ese ID.' }, 400);
        } else {
            successResponse(res, { productoDB });
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
        .exec((error, productosDB) => {
            if (error) {
                errorResponse(res, error, 500);
            } else {
                Producto.countDocuments(filter, (err, total) => {
                    if (err) {
                        errorResponse(res, err, 500);
                    } else {
                        successResponse(res, { paginacion: paginacion.paginar(req.path, total, pag, cant), productosDB });
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
