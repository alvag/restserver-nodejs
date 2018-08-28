const _ = require( 'underscore' );
const Categoria = require( '../models/categoria.model' );
const { errorResponse, successResponse } = require( '../helpers/response.helper' );

const get = ( req, res ) => {
    let id = req.params.id;

    if ( id ) {
        Categoria.findOne( { _id: id } )
        .populate( 'user' )
        .exec( ( error, categoria ) => {
            if ( error ) {
                errorResponse( res, error, 500 );
            } else if ( !categoria ) {
                errorResponse( res, { message: 'Categoría no encontrada' } );
            } else {
                successResponse( res, { categoria } );
            }
        } );
    } else {
        let skip = req.query.skip || 0;
        let limit = req.query.limit || 5;

        Categoria.find( {} )
        .populate( 'user' )
        .limit( Number( limit ) )
        .skip( Number( skip ) )
        .exec( ( error, categorias ) => {
            if ( error ) {
                errorResponse( res, error, 500 );
            } else {
                Categoria.countDocuments( {}, ( err, total ) => {
                    if ( err ) {
                        errorResponse( res, err, 500 );
                    } else {
                        successResponse( res, { categorias, total } );
                    }
                } );

            }
        } );
    }
};

const create = ( req, res ) => {
    let categoria = new Categoria( {
        descripcion: req.body.descripcion,
        user: req.user._id
    } );

    categoria.save( ( error, categoria ) => {
        if ( error ) {
            errorResponse( res, error );
        } else {
            successResponse( res, { categoria }, 201 );
        }
    } );

};

const update = ( req, res ) => {
    let body = _.pick( req.body, [ 'descripcion' ] );
    console.log( body );
    let id = req.params.id;

    Categoria.findOneAndUpdate( { _id: id }, body, { new: true, runValidators: true }, ( error, categoria ) => {
        if ( error ) {
            errorResponse( res, error, 500 );
        } else if ( !categoria ) {
            errorResponse( res, { message: 'Categoria no encontrada' } );
        } else {
            successResponse( res, { categoria }, 200 );
        }
    } );
};

const del = ( req, res ) => {};

module.exports = {
    get,
    create,
    update,
    del
};
