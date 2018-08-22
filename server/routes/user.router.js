const express = require( 'express' );
const app = express();
const bcrypt = require( 'bcrypt' );
const _ = require( 'underscore' );
const User = require( '../models/user.model' );

app.get('/usuario', (req, res) => {

    let skip = req.query.skip || 0;
    let limit = req.query.limit || 5;

    User.find( {}, 'name email role status google img' )
    .limit( Number( limit ) )
    .skip( Number( skip ) )
    .exec( async ( error, users ) => {

        if ( error ) {
            return res.status( 400 ).json( {
                ok: false,
                error
            } );
        }

        User.countDocuments( {}, ( err, total ) => {
            res.json( {
                ok: true,
                users,
                total
            } );
        } );

    } );
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let user = new User( {
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role
    } );

    user.save( ( error, userDB ) => {
        if ( error ) {
            return res.status( 400 ).json( {
                ok: false,
                error
            } );
        }

        res.json( {
            ok: true,
            user: userDB
        } );
    } );


});

app.put( '/usuario/:id', ( req, res ) => {

    let body = _.pick( req.body, [ 'name', 'email', 'img', 'role', 'status' ] );
    let id = req.params.id;

    User.findOneAndUpdate( { _id: id }, body, { new: true, runValidators: true }, ( error, userDB ) => {
        if ( error ) {
            return res.status( 400 ).json( {
                ok: false,
                error
            } );
        }

        res.json( {
            ok: true,
            user: userDB
        } );

    } );
});

app.delete('/usuario', (req, res) => {
    res.send('delete Usuario');
});

module.exports = app;
