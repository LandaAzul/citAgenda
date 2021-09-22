const { Router } = require('express');
const router = Router();

router.route('/')
const {getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa, getEmpresa} = require('../controllers/empresa.controllers.js')
router.route('/')
    .get(getEmpresas)
    .post(createEmpresa)

router.route('/:id') 
    .get(getEmpresa)
    .put(updateEmpresa)
    .delete(deleteEmpresa)
    
module.exports = router;