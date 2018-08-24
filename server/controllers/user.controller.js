const bcrypt = require( 'bcrypt' );
const _ = require( 'underscore' );
const User = require( '../models/user.model' );
const { errorResponse, successResponse } = require( '../helpers/response.helper' );
const jwt = require( '../helpers/jwt.helper' );

const get = ( req, res ) => {
    let id = req.params.id;

    if ( id ) {

        User.findOne( { _id: id, isActive: true }, 'name email role isActive google img' )
        .exec( ( error, user ) => {

            if ( error ) {
                errorResponse( res, error, 500 );
            } else if ( !user ) {
                errorResponse( res, { message: 'Usuario no encontrado' } );
            } else {
                successResponse( res, { user } );
            }

        } );

    } else {
        let skip = req.query.skip || 0;
        let limit = req.query.limit || 5;
        let active = req.query.active || true;

        User.find( { isActive: active }, 'name email role isActive google img' )
        .limit( Number( limit ) )
        .skip( Number( skip ) )
        .exec( ( error, users ) => {

            if ( error ) {
                errorResponse( res, error, 500 );
            } else {
                User.countDocuments( {}, ( err, total ) => {
                    if ( err ) {
                        errorResponse( res, err, 500 );
                    } else {
                        successResponse( res, { users, total } );
                    }
                } );

            }


        } );
    }


};

const create = ( req, res ) => {
    let body = req.body;

    let user = new User( {
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role
    } );

    createUser( res, user );
};

const createUser = ( res, user ) => {
    user.save( ( error, user ) => {
        if ( error ) {
            errorResponse( res, error );
        } else {
            successResponse( res, { user }, 201 );
        }
    } );
};

const update = ( req, res ) => {
    let body = _.pick( req.body, [ 'name', 'img', 'role', 'isActive' ] );
    let id = req.params.id;

    updateUser( res, body, { _id: id } );
};

const del = ( req, res ) => {
    let id = req.params.id;
    updateUser( res, { isActive: false }, { _id: id } );
};

let updateUser = ( res, body, filter ) => {
    User.findOneAndUpdate( filter, body, { new: true, runValidators: true }, ( error, user ) => {
        if ( error ) {
            errorResponse( res, error );
        } else if ( !user ) {
            errorResponse( res, { message: 'Usuario no encontrado' } );
        } else {
            let token;
            if ( body.google ) {
                token = jwt.createToken( user );
            }
            successResponse( res, { user, token } );
        }
    } );
};

module.exports = {
    get,
    create,
    update,
    del,
    updateUser,
    createUser
};
