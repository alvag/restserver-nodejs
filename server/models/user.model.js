const { Schema, model } = require('mongoose');

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido.'],
    },
    email: {
        type: String,
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
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

// Elimina el campo contraseña del usuario
userSchema.methods.toJSON = function () {
    let userObject = this.toObject();
    userObject.uid = userObject._id;
    delete userObject._id;
    delete userObject.password;
    delete userObject.__v;
    return userObject;
};

module.exports = model('User', userSchema);
