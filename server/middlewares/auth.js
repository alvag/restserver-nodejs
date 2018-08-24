const jwt = require( '../helpers/jwt.helper' );
const { errorResponse } = require( '../helpers/response.helper' );

const isAuth = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        errorResponse(res, {message: "No tienes autorización."}, 401)
    }

    jwt.decodeToken(token)
    .then(response => {
        req.user = response.user;
        next();
    })
    .catch(() => {
        errorResponse(res, {message: "No tienes autorización."}, 401);
    });
};

module.exports = {
    isAuth
};
