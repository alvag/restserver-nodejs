const bcrypt = require( 'bcrypt' );
const User = require( '../models/user.model' );
const { errorResponse, successResponse } = require( '../helpers/response.helper' );

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
                successResponse(res, {user, token: '123'});
            }
        }
    });

};


module.exports = {
  login
};
