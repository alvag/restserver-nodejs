const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

categoriaSchema.plugin(uniqueValidator, { message: 'El campo {PATH} debe ser único.' });

module.exports = mongoose.model('Categoria', categoriaSchema);
