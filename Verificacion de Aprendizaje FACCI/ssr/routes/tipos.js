const { Router } = require('express');
const { check } =  require('express-validator')


const {
    crearTipo,
    obtenerTipo,
    obtenerTipos,
    actualizarTipo,
    borrarTipo
} = require('../controllers').Tipo;

const { validarCampos } = require('../middlewares')

const router= Router();

router.get('/', obtenerTipos );
router.get('/:id'
,check('id', 'Este no es un ID de Mongo correcto').isMongoId()
 , obtenerTipo );

 router.post('/',[
    check('nombre', 'EL nombre es requerido').not().isEmpty(),
    validarCampos
], crearTipo);


 router.put('/:id', actualizarTipo);

 router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], borrarTipo);



module.exports = router;