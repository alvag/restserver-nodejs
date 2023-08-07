const jwt = require('../helpers/jwt.helper');

const isAuth = (req, res, next) => {
    verificaToken(req, res, next, req.get('Authorization'));
};

const checkTokenImg = (req, res, next) => {
    verificaToken(req, res, next, req.query.token);
};

const verificaToken = (req, res, next, token) => {
    if (!token) {
        res.status(401).json({
            message: 'No tienes autorización.',
        });
    } else {
        jwt.decodeToken(token)
            .then((response) => {
                req.user = response.user;
                next();
            })
            .catch((error) => {
                console.log(error);
                res.status(401).json({
                    message: 'No tienes autorización.',
                });
            });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.status(403).json({
            message: 'No tienes permisos para realizar esta acción.',
        });
    }
};

module.exports = {
    isAuth,
    isAdmin,
    checkTokenImg,
};
