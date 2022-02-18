//const router
const { Router } = require('express');
const router = Router();
const upload = require('../libs/storage');
const {verifyToken, esProfesor, esAdministrador, esSocio, checkRolesExisted, estaActivo } = require('../middlewares')
//Rutas para los usuarios
//Importamos el archivo controlador de las rutas con sus funciones 
const {getUsers, createUser, updateUserId, deleteUserId, getUserId, getUserDocumento, updateUserDocumento, deleteUserDocumento, getUserCodigo, updateUserCodigo, deleteUsercodigo, updatePass, updateDataUserId, updateImagenUserId} = require('../controllers/users.controllers.js')
router.route('/')
    //.get([verifyToken, esProfesor], getUsers)
    //.get([verifyToken], getUsers)
    .get( getUsers)
    //.post(createUser)
    .post([verifyToken, esAdministrador, estaActivo, checkRolesExisted], createUser)
router.route('/:id') 
//para el id
    .get([verifyToken, esSocio], getUserId)
    .put([verifyToken, esAdministrador, estaActivo, checkRolesExisted], updateUserId)
    .delete([verifyToken, estaActivo, esAdministrador], deleteUserId)
router.route('/documento/:documento') 
//para documento
    .get([verifyToken, esAdministrador, estaActivo], getUserDocumento)
    .put([verifyToken, esAdministrador, estaActivo, checkRolesExisted], updateUserDocumento)
    .delete([verifyToken, estaActivo, esAdministrador], deleteUserDocumento)
router.route('/codigo/:codigo') 
//para codigo
    .get([verifyToken, estaActivo, esAdministrador], getUserCodigo)
    .put([verifyToken, estaActivo, esAdministrador, checkRolesExisted], updateUserCodigo)
    .delete([verifyToken, estaActivo, esAdministrador], deleteUsercodigo)
//para contraseña, imagen y datos
router.route('/cambiarContra/:id')
    .put([verifyToken, esSocio], updatePass)
router.route('/cambiarDatos/:id')
    .put([verifyToken, esSocio], updateDataUserId)
router.route('/cambiarImagen/:id')
    .put([verifyToken, esSocio], upload.single('image') ,updateImagenUserId)
module.exports = router;
