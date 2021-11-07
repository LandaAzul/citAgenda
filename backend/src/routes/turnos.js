const { Router } = require('express');
const router = Router();

const {verifyToken, isModerator, isAdmin} = require('../middlewares')

router.route('/')
const {getTurnos, createTurno, updateTurno, deleteTurno, getTurno} = require('../controllers/turno.controllers.js')
router.route('/')
    .get(getTurnos)
//router.get('/', verifyToken, getTurnos)  //OTRA MANERA DE ESCRIBIR LA LINEA ANTERIOR
    .post([verifyToken, isModerator], createTurno)
router.route('/:id')
    .get(getTurno)
    .put([verifyToken, isAdmin], updateTurno)
    .delete([verifyToken, isAdmin], deleteTurno)
    
module.exports = router;