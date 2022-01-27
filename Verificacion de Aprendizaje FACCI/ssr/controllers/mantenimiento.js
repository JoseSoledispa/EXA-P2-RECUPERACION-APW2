const { response } = require('express')
const {  Mantenimiento } = require('../models')


const obtenerMantenimientos= async (req, res = response )=>{

  
    const { limite = 10 , desde=0 } =  req.query;
    const query = { estado:true };

    const [ total, mantenimientos ] = await Promise.all([
        Mantenimiento.countDocuments(query),
        Mantenimiento.find(query)
        .populate('tipo','nombre estado')
        .skip(Number(desde))
        .limit(Number(limite))
    ])
  
    res.json({
      total, 
      mantenimientos
    })
    
}
const obtenerMantenimiento= async (req, res =  response)=>{
    const {id} = req.params
    const mantenimiento=  await Mantenimiento.findById(id).populate('categoria');
    res.json(mantenimiento);
}
const crearMantenimiento= async (req, res = response)=>{
    const { estado, usuario, ...body } =  req.body;
    
    const existeMantenimiento =  await Mantenimiento.findOne({detalle: body.detalle})

    if (existeMantenimiento)
    {
        return res.status(400).json({
            msg:`El mantenimiento ${ existeMantenimiento.detalle } ya existe`
        })
    }

    const data = {
        ...body,
        detalle: body.detalle
    }

    const mantenimiento = new Mantenimiento(data);

    const nuevoMantenimiento =  await mantenimiento.save();
    res.status(201).json(nuevoMantenimiento);
}
const actualizarMantenimiento= async (req, res=response)=>{
    const {id} = req.params;
    const { estado, ...data } =  req.body;
    const mantenimientoModificado =  await Mantenimiento.findByIdAndUpdate(id,data, {new: true} )
    res.json(mantenimientoModificado);
}
const borrarMantenimiento= async (req, res = response)=>{
    const {id} = req.params;
    const mantenimientoBorrado =  await Mantenimiento.findByIdAndUpdate(id, {estado:false}, {new:true} );
    res.json(mantenimientoBorrado);
}

module.exports = {
    obtenerMantenimiento,
    obtenerMantenimientos,
    crearMantenimiento,
    actualizarMantenimiento,
    borrarMantenimiento
};