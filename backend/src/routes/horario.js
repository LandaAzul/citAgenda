const { Router } = require('express');
const router = Router();

router.route('/')
const {getHorarios, createHorario, updateHorario, deleteHorario, getHorario, activarHorario, mirarHorario, solicitudHorario} = require('../controllers/horario.controllers.js')
router.route('/')
    .get(getHorarios)
    .post(createHorario)

router.route('/:id') 
    .get(getHorario)
    .put(updateHorario)
    .delete(deleteHorario)

router.route('/activar/:id')
    .put(activarHorario)
    .get(mirarHorario)     

router.route('/solicitud/:id')
    .put(solicitudHorario)
    
module.exports = router;