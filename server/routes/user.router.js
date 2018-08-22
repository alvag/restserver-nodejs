const express = require( 'express' );
const app = express();
const User = require( '../models/user.model' );

app.get('/usuario', (req, res) => {
    res.send('get Usuario');
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    let user = new User( {
        name: body.name,
        email: body.email,
        password: body.password,
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

app.put('/usuario', (req, res) => {
    res.send('put Usuario');
});

app.delete('/usuario', (req, res) => {
    res.send('delete Usuario');
});

module.exports = app;
