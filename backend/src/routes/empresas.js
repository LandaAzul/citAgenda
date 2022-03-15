const { Router } = require('express');
const router = Router();
const { verifyToken , esSocio , esProfesor, esAdministrador } = require("../middlewares");
const multer = require('multer');

const imgEmpresa = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/imagesEmpresa');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
  });
  const rutaEmpresa = multer({ storage: imgEmpresa });

router.route('/')
const {getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa, getEmpresa, updateEmpresaForm, uploadImgEmpresa, showImgEmpresa, deleteImgEmpresa, editVerImgEmpresa, editPresentarImgEmpresa, updateEmpresaHorario} = require('../controllers/empresa.controllers.js')
router.route('/')
    .get(getEmpresas)
    .post([verifyToken, esAdministrador], createEmpresa)

router.route('/configuracion/:id') 
    .get(getEmpresa)
    .put([verifyToken, esAdministrador], updateEmpresa)
    .delete([verifyToken, esAdministrador], deleteEmpresa)

router.route('/configuracion/formulario/:id') 
    .put([verifyToken, esAdministrador], updateEmpresaForm)

router.route('/configuracion/horario/:id') 
    .put([verifyToken, esAdministrador], updateEmpresaHorario)
//router.route('/subirImagenes/')
router.route('/imagenes/')
    .post([verifyToken, esAdministrador], rutaEmpresa.array('imagen', 5) ,uploadImgEmpresa)
    .get(showImgEmpresa)

router.route('/imagenes/:id')
    .delete([verifyToken, esAdministrador],deleteImgEmpresa)

router.route('/imagenes/ver/:id')
    .put([verifyToken, esAdministrador],editVerImgEmpresa)

router.route('/imagenes/presentar/:id')
    .put([verifyToken, esAdministrador],editPresentarImgEmpresa)

    
module.exports = router;