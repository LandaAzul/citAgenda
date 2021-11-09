const { Router } = require('express');
const router = Router();
const { verifyToken , isUser , isModerator, isAdmin } = require("../middlewares");


router.route('/')
const {getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa, getEmpresa} = require('../controllers/empresa.controllers.js')
router.route('/')
    .get([verifyToken, isAdmin], getEmpresas)
    .post([verifyToken, isAdmin], createEmpresa)

router.route('/:id') 
    .get([verifyToken, isAdmin], getEmpresa)
    .put([verifyToken, isAdmin], updateEmpresa)
    .delete([verifyToken, isAdmin], deleteEmpresa)
    
module.exports = router;