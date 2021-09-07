const { Router } = require('express');
const router = Router();

router.route('/')
const {getLecciones, createLeccion, updateLeccion, deleteLeccion, getLeccion} = require('../controllers/lecciones.controllers.js')
router.route('/')
    .get(getLecciones)
    .post(createLeccion)

router.route('/:id') 
    .get(getLeccion)
    .put(updateLeccion)
    .delete(deleteLeccion)
    
module.exports = router;