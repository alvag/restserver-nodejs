const { Schema, model } = require('mongoose');

let roleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El rol es requerido.'],
    },
});

module.exports = model('Role', roleSchema);
