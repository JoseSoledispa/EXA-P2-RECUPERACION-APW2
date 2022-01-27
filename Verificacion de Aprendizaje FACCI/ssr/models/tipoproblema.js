const { model, Schema } = require('mongoose');

const TipoSchema = Schema(
    {
        detalle:{
            type: String,
            required: [ true, 'El detalle del producto es necesario'],
            unique:true
        },
        estado:{
            type: Boolean,
            default: true,
            required:true
        }
    }
);


module.exports = model('Tipo', TipoSchema );