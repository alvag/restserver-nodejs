const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user.model');
const { errorResponse, successResponse } = require('../helpers/response.helper');
const jwt = require('../helpers/jwt.helper');
const { paginar } = require('../helpers/paginacion.helper');

const get = async (req, res) => {
    let id = req.params.id;

    if (id) {
        try {
            const user = await User.findOne(
                { _id: id, isActive: true },
                'name email role isActive google img'
            );

            if (!user) {
                errorResponse(res, { message: 'Usuario no encontrado' });
            } else {
                successResponse(res, { user });
            }
        } catch (error) {
            errorResponse(res, error, 500);
        }
    } else {
        try {
            let pag = Number(req.query.pag) || 1;
            let cant = Number(req.query.cant) || 5;

            let active = req.query.active || true;

            const [users, total] = await Promise.all([
                User.find(
                    { isActive: active },
                    'name email role isActive google img'
                )
                    .limit(cant)
                    .skip((pag - 1) * cant)
                    .exec(),
                User.countDocuments({ isActive: active }),
            ]);

            successResponse(res, {
                paginacion: paginar(req.path, total, pag, cant),
                users,
            });
        } catch (error) {
            errorResponse(res, error, 500);
        }
    }
};

const create = async (req, res) => {
    let user = req.body;
    return await createUser(res, user);
};

const createUser = async (res, user) => {
    let newUser = new User({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    let token;
    if (!newUser.google) {
        newUser.password = bcrypt.hashSync(user.password, 10);
    } else {
        newUser.password = null;
        token = jwt.createToken(user);
    }

    try {
        const user = await newUser.save();
        if (user.google) {
            successResponse(res, { user, token }, 201);
        } else {
            successResponse(res, { user, token }, 201);
            // mail.verifyAccount(res, user);
        }
    } catch (error) {
        console.log(error);
        errorResponse(res, error);
    }
};

const update = (req, res) => {
    let body = _.pick(req.body, [
        'name',
        'img',
        'role',
        'isActive',
        'password',
    ]);
    let id = req.params.id;

    updateUser(res, body, { _id: id });
};

const del = (req, res) => {
    let id = req.params.id;
    updateUser(res, { isActive: false }, { _id: id, isActive: true });
};

let updateUser = async (res, body, filter) => {
    try {
        if (body.password) {
            body.password = bcrypt.hashSync(body.password, 10);
        }

        const user = await User.findOneAndUpdate(filter, body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return errorResponse(res, { message: 'Usuario no encontrado' });
        }

        let token;
        if (body.google) {
            token = jwt.createToken(user);
        }
        successResponse(res, { user, token });
    } catch (error) {
        console.log(error);
        errorResponse(res, error);
    }
};

const verificar = (req, res) => {
    let id = req.params.id;

    User.findOneAndUpdate({ _id: id }, { isActive: true }, (error, user) => {
        if (error) {
            res.send('<h1>Error al verificar el correo.</h1>');
        } else if (!user) {
            res.send('<h1>El usuario no existe.</h1>');
        } else {
            res.send('<h1>Usuario verificado!!!</h1>');

        }
    });
};

module.exports = {
    get,
    create,
    update,
    del,
    updateUser,
    createUser,
    verificar
};
