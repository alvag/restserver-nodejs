const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido.',
};

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido.'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido.'],
    },
    password: {
        type: String,
        required: [this.google === false, 'La contraseña es requerida.'],
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

// Elimina el campo contraseña del usuario
userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único.' });

module.exports = model('User', userSchema);
