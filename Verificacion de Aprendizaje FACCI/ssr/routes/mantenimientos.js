const { Router } = require('express')
const { check } =  require('express-validator')

const { crearMantenimiento,
     obtenerMantenimiento, 
     obtenerMantenimientos,
     actualizarMantenimiento,
     borrarMantenimiento } = require('../controllers').Mantenimiento;

const { validarCampos } = require('../middlewares')

const router = Router();

///     https://localhost:3000/api/v1/    Mantenimientos/      

router.get('/', obtenerMantenimientos);

router.get('/:id', [ 
    check('id', 'Este no es un ID de Mongo correcto').isMongoId() 
 ]  , obtenerMantenimiento);

router.post('/',[
    check('detalle', 'EL detalle es requerido').not().isEmpty(),
    validarCampos
] , crearMantenimiento)

router.put('/:id', actualizarMantenimiento)

router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], borrarMantenimiento)

module.exports = router;