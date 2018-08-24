const bcrypt = require( 'bcrypt' );
const User = require( '../models/user.model' );
const { errorResponse, successResponse } = require( '../helpers/response.helper' );
const jwt = require( '../helpers/jwt.helper' );
const { OAuth2Client } = require( 'google-auth-library' );
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

const login = (req, res) => {
    let body = req.body;

    if (!body.password) body.password = '';

    User.findOne({email: body.email}, (error, user) => {
        if (error) {
            errorResponse(res, error, 500);
        } else if (!user) {
            errorResponse( res, { message: 'Usuario o contraseña incorrectos.' } );
        } else {
            if (!bcrypt.compareSync(body.password, user.password)) {
                errorResponse( res, { message: 'Usuario o contraseña incorrectos.' } );
            } else {
                successResponse( res, { user, token: jwt.createToken( user ) } );
            }
        }
    });
};

const google = ( req, res ) => {
    let token = req.body.idtoken;
    verify( token );

    successResponse( res, { token } );
};

const verify = async ( token ) => {
    const ticket = await client.verifyIdToken( {
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    } );
    const payload = ticket.getPayload();
    console.log( payload );
};

module.exports = {
    login,
    google
};
