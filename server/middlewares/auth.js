const jwt = require( '../helpers/jwt.helper' );
const { errorResponse } = require( '../helpers/response.helper' );

const isAuth = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        errorResponse( res, { message: 'No tienes autorización.' }, 401 );
    }

    jwt.decodeToken(token)
    .then(response => {
        req.user = response.user;
        next();
    })
    .catch( ( error ) => {
        errorResponse( res, { message: 'No tienes autorización.', error }, 401 );
    });
};

const isAdmin = ( req, res, next ) => {
    if ( req.user.role === 'ADMIN_ROLE' ) {
        next();
    } else {
        errorResponse( res, { message: 'No tienes permisos para realizar esta acción.' }, 403 );
    }
};

module.exports = {
    isAuth, isAdmin
};
