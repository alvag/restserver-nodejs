const _ = require('underscore');
const Categoria = require('../models/categoria.model');
const { errorResponse, successResponse } = require('../helpers/response.helper');

const get = (req, res) => {
    let _id = req.params.id;

    if (_id) {
        Categoria.findOne({ _id })
            .populate('user', 'name email')
            .exec((error, categoria) => {
                if (error) {
                    errorResponse(res, error, 500);
                } else if (!categoria) {
                    errorResponse(res, { message: 'Categoría no encontrada' });
                } else {
                    successResponse(res, { categoria });
                }
            });
    } else {
        let skip = req.query.skip || 0;
        let limit = req.query.limit || 5;

        Categoria.find({})
            .sort('descripcion')
            .populate('user')
            .limit(Number(limit))
            .skip(Number(skip))
            .exec((error, categorias) => {
                if (error) {
                    errorResponse(res, error, 500);
                } else {
                    Categoria.countDocuments({}, (err, total) => {
                        if (err) {
                            errorResponse(res, err, 500);
                        } else {
                            successResponse(res, { categorias, total });
                        }
                    });

                }
            });
    }
};

const create = (req, res) => {
    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        user: req.user._id
    });

    Categoria.findOne({ descripcion: categoria.descripcion }, (error, categoriaDB) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (categoriaDB) {
            errorResponse(res, { message: 'Ya exista una categoría con esa descripción.' });
        } else {
            categoria.save((error, categoriaDB) => {
                if (error) {
                    errorResponse(res, error);
                } else {
                    successResponse(res, { categoriaDB }, 201);
                }
            });
        }
    })
};

const update = (req, res) => {
    let body = _.pick(req.body, ['descripcion']);
    let _id = req.params.id;

    Categoria.findOne({ descripcion: body.descripcion }, (error, categoriaDB) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (categoriaDB && categoriaDB._id != _id) {
            errorResponse(res, { message: 'Ya exista una categoría con esa descripción.' });
        } else {
            Categoria.findOneAndUpdate({ _id }, body, { new: true, runValidators: true }, (error, categoriaDB) => {
                if (error) {
                    errorResponse(res, error);
                } else {
                    successResponse(res, { categoriaDB });
                }
            });
        }

    })
};

const del = (req, res) => {
    let _id = req.params.id;

    Categoria.findOneAndRemove({ _id }, (error, categoriaDB) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (!categoriaDB) {
            successResponse(res, { message: 'No existe ninguna categoría con ese ID.' }, 400);
        } else {
            successResponse(res, { categoriaDB });
        }
    })
};

module.exports = {
    get,
    create,
    update,
    del
};
