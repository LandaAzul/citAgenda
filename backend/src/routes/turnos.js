const { Router } = require('express');
const router = Router();

router.route('/')
const {getTurnos, createTurno, updateTurno, deleteTurno, getTurno} = require('../controllers/turno.controllers.js')
router.route('/')
    .get(getTurnos)
    .post(createTurno)

router.route('/:id') 
    .get(getTurno)
    .put(updateTurno)
    .delete(deleteTurno)
    
module.exports = router;