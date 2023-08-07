const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user.model');
const jwt = require('../helpers/jwt.helper');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const userController = require('./user.controller');
const mail = require('./mail.controller');

const login = (req, res) => {
    let body = req.body;

    if (!body.password) body.password = '';

    User.findOne({ email: body.email, isActive: true })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: 'Usuario o contraseña incorrectos.',
                });
            }

            if (!user.password) {
                return res.status(400).json({
                    message: 'Usuario o contraseña incorrectos.',
                });
            }

            if (!bcrypt.compareSync(body.password, user.password)) {
                return res.status(400).json({
                    message: 'Usuario o contraseña incorrectos.',
                });
            }

            res.status(200).json({
                user,
                token: jwt.createToken(user),
            });

            /* if (user.isActive) {
                return successResponse(res, {
                    user,
                    token: jwt.createToken(user),
                });
            } */

            // mail.verifyAccount(res, user);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error',
            });
        });
};

const google = async (req, res) => {
    let token = req.body.idtoken;
    let googleUser = await verify(token).catch((error) => {
        return res.status(403).json({
            error,
        });
    });

    User.findOne({ email: googleUser.email }, (error, user) => {
        if (error) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        } else {
            if (user) {
                let updateUser = _.pick(googleUser, [
                    'name',
                    'img',
                    'google',
                    'isActive',
                ]);
                userController.updateUser(res, updateUser, { _id: user._id });
            } else {
                userController.createUser(res, googleUser);
            }
        }
    });
};

const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
        password: null,
        isActive: true
    };

};

module.exports = {
    login,
    google
};
