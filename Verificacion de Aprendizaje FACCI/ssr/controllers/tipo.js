const { response } = require('express');
const { Tipo } = require('../models');


const obtenerTipos = async (req,res = response )=>{
    const { limite = 10 , desde=0 } =  req.query;
    const query = { estado:true };

    const [ total, Tipos ] = await Promise.all([
        Tipo.countDocuments(query),
        Tipo.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.json({
      total, 
      Tipos
    })
}

const obtenerTipo = async (req, res= response)=>{
    const {id} = req.params
    const Tipo=  await Tipo.findById(id);
    res.json(Tipo);
}
const crearTipo = async(req,res=response)=>{
    const { estado, ...body } =  req.body;
    
    const existeTipo =  await Tipo.findOne({detalle: body.detalle})

    if (existeTipo)
    {
        return res.status(400).json({
            msg:`La Tipo ${ existeTipo.detalle } ya existe`
        })
    }

    const data = {
        ...body,
        detalle: body.detalle
    }

    const Tipo = new Tipo(data);

    const nuevaTipo =  await Tipo.save();
    res.status(201).json(nuevaTipo);
}
const actualizarTipo = async(req,res =  response)=>{
    const {id} = req.params;
    const { estado, ...data } =  req.body;
    const TipoModificada =  await Tipo.findByIdAndUpdate(id,data, {new: true} )
    res.json(TipoModificada);
}
const borrarTipo =  async (req, res= response)=>{
    const {id} = req.params;
    const TipoBorrada =  await Tipo.findByIdAndUpdate(id, {estado:false}, {new:true} );
    res.json(TipoBorrada);
}

 module.exports ={
    crearTipo,
    obtenerTipo,
    obtenerTipos,
    actualizarTipo,
    borrarTipo
 }

