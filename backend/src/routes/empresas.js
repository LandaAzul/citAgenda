const { Router } = require('express');
const router = Router();
const { verifyToken , esSocio , esProfesor, esAdministrador } = require("../middlewares");
const multer = require('multer');

const imgEmpresa = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'backend/src/public/imagesEmpresa');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
  });
  const rutaEmpresa = multer({ storage: imgEmpresa });

router.route('/')
const {getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa, getEmpresa, uploadImagesEmpresa} = require('../controllers/empresa.controllers.js')
router.route('/')
    .get(getEmpresas)
    .post([verifyToken, esAdministrador], createEmpresa)

router.route('/:id') 
    .get(getEmpresa)
    .put([verifyToken, esAdministrador], updateEmpresa)
    .delete([verifyToken, esAdministrador], deleteEmpresa)

router.route('/subirImagenes/:id')
    .put([verifyToken, esSocio], rutaEmpresa.single('imagen') ,uploadImagesEmpresa)

    
module.exports = router;