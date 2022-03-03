const { Router } = require('express');
const router = Router();

router.route('/')
const {getHorarios, createHorario, updateHorario, deleteHorario, getHorario} = require('../controllers/horario.controllers.js')
router.route('/')
    .get(getHorarios)
    .post(createHorario)

router.route('/:id') 
    .get(getHorario)
    .put(updateHorario)
    .delete(deleteHorario)
    
module.exports = router;