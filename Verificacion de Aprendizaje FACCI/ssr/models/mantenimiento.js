const { model, Schema } = require('mongoose');

const MantenimientoSchema = Schema(
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
        },
        descripcion:{
            type: String,
        },
        ticket:{
            type:Number,
            default:0
        },
        fecha:{
            type:String,
        },
        hora:{
            type:String,
        },
        tipo: {
            type: Schema.Types.ObjectId,
            ref:'Tipo',
            required:false
        }
    }
);


MantenimientoSchema.methods.toJSON = function(){
    const { __v,  estado,  ...data   } =  this.toObject();
    return data;
}

module.exports = model('Mantenimiento', MantenimientoSchema );