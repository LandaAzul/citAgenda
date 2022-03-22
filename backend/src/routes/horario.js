const { Router } = require('express');
const router = Router();

router.route('/')
const {getHorarios, createHorario, updateHorario, deleteHorario, getHorario, activarHorario, regenerarHorario, mirarHorario, tituloHorario, solicitudHorario, asignarProfesor, editarAsistio, editarGranDemanda } = require('../controllers/horario.controllers.js')
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
    
router.route('/regenerar/:id')
    .put(regenerarHorario)
    .get(mirarHorario)

router.route('/solicitud/:id')
    .put(solicitudHorario)

router.route('/titulo/:id')
    .put(tituloHorario)

router.route('/configuracion/:id')
    .put(asignarProfesor)

router.route('/asistio/:id')
    .put(editarAsistio)

router.route('/granDemanda/:id')
    .put(editarGranDemanda)

module.exports = router;