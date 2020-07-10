const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let impresoraSchema = new Schema({
    marca: {
        type: String,
        required: [true, 'La marca es requerida']
    },
    modelo: {
        type: String,
        required: [true, 'El modelo es requerido']
    },
    serie: {
        type: Number,
        required: [true, 'la serie es requerida'],
        unique: true
    },
    color: {
        type: Boolean,
        default: false,
        required: false
    },
    ip: {
        type: String,
        required: [true, 'la ip es requerida'],
    },
    contador: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        required: [true, 'el prescio es requerido'],
    }

});

impresoraSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })


impresoraSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.contador;

    return userObject
}


module.exports = mongoose.model('impresora', impresoraSchema);