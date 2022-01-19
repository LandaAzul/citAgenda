const { Router } = require('express');
const router = Router();
const { verifyToken , esSocio , esProfesor, esAdministrador } = require("../middlewares");


router.route('/')
const {getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa, getEmpresa} = require('../controllers/empresa.controllers.js')
router.route('/')
    .get(getEmpresas)
    .post([verifyToken, esAdministrador], createEmpresa)

router.route('/:id') 
    .get(getEmpresa)
    .put([verifyToken, esAdministrador], updateEmpresa)
    .delete([verifyToken, esAdministrador], deleteEmpresa)
    
module.exports = router;