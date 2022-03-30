const { Router } = require('express');
const router = Router();

router.route('/')
const {getHorarios, getEsquemaHorarios, getEsquemaHorario, createHorario, updateHorario, deleteHorario, getHorario, activarHorario, MostrarTodoElHorario, regenerarHorario, horariosActivos, tituloHorario, solicitudHorario, asignarProfesor, editarAsistio, editarGranDemanda } = require('../controllers/horario.controllers.js')
router.route('/')
    .get(getHorarios)
    .post(createHorario)

router.route('/esquema/')
    .get(getEsquemaHorarios)

router.route('/esquema/:id')
    .get(getEsquemaHorario)

router.route('/activos/')
    .get(horariosActivos)

router.route('/:id') 
    .get(getHorario)
    .put(updateHorario)
    .delete(deleteHorario)

router.route('/activar/:id')
    .put(activarHorario)

router.route('/mostrarTodo/:id')
    .put(MostrarTodoElHorario)
    
router.route('/regenerar/:id')
    .put(regenerarHorario)

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