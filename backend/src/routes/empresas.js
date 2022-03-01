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
const {getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa, getEmpresa, uploadImgEmpresa, showImgEmpresa, deleteImgEmpresa, editVerImgEmpresa, editPresentarImgEmpresa } = require('../controllers/empresa.controllers.js')
router.route('/')
    .get(getEmpresas)
    .post([verifyToken, esAdministrador], createEmpresa)

router.route('/Empresa/:id') 
    .get(getEmpresa)
    .put([verifyToken, esAdministrador], updateEmpresa)
    .delete([verifyToken, esAdministrador], deleteEmpresa)

//router.route('/subirImagenes/')
router.route('/Imagenes/')
    .post([verifyToken, esAdministrador], rutaEmpresa.array('imagen', 5) ,uploadImgEmpresa)
    .get(showImgEmpresa)

    router.route('/Imagenes/:id')
    .delete([verifyToken, esAdministrador],deleteImgEmpresa)

router.route('/Imagenes/ver/:id')
    .put([verifyToken, esAdministrador],editVerImgEmpresa)

router.route('/Imagenes/presentar/:id')
    .put([verifyToken, esAdministrador],editPresentarImgEmpresa)

    
module.exports = router;