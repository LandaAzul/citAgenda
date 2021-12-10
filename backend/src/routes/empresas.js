const { Router } = require('express');
const router = Router();
const { verifyToken , isUser , isModerator, isAdmin } = require("../middlewares");


router.route('/')
const {getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa, getEmpresa} = require('../controllers/empresa.controllers.js')
router.route('/')
    .get(getEmpresas)
    .post([verifyToken, isAdmin], createEmpresa)

router.route('/:id') 
    .get(getEmpresa)
    .put([verifyToken, isAdmin], updateEmpresa)
    .delete([verifyToken, isAdmin], deleteEmpresa)
    
module.exports = router;