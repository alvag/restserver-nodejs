const mongoose = require( 'mongoose' );

let Schema = mongoose.Schema;

let userSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'El nombre es requerido' ]
    },
    email: {
        type: String,
        required: [ true, 'El correo es requerido' ]
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es requerida' ]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
} );

module.exports = mongoose.model( 'User', userSchema );
