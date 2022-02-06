//const router
const { Router } = require('express');
const router = Router();
const {verifyToken, esProfesor, esAdministrador, esSocio, checkRolesExisted} = require('../middlewares')
//Rutas para los usuarios
//Importamos el archivo controlador de las rutas con sus funciones 
const {getUsers, createUser, updateUserId, deleteUserId, getUserId, getUserDocumento, updateUserDocumento, deleteUserDocumento, getUserCodigo, updateUserCodigo, deleteUsercodigo, updatePass, updateDataUserId, updateImagenUserId} = require('../controllers/users.controllers.js')
router.route('/')
    //.get([verifyToken, esProfesor], getUsers)
    //.get([verifyToken], getUsers)
    .get( getUsers)
    //.post(createUser)
    .post([verifyToken, esAdministrador, checkRolesExisted], createUser)
router.route('/:id') 
//para el id
    .get([verifyToken, esProfesor], getUserId)
    .put([verifyToken, esAdministrador, checkRolesExisted], updateUserId)
    .delete([verifyToken, esAdministrador], deleteUserId)
router.route('/documento/:documento') 
//para documento
    .get([verifyToken, esProfesor], getUserDocumento)
    .put([verifyToken, esAdministrador, checkRolesExisted], updateUserDocumento)
    .delete([verifyToken, esAdministrador], deleteUserDocumento)
router.route('/codigo/:codigo') 
//para codigo
    .get([verifyToken, esProfesor], getUserCodigo)
    .put([verifyToken, esAdministrador, checkRolesExisted], updateUserCodigo)
    .delete([verifyToken, esAdministrador], deleteUsercodigo)
//para contraseña, imagen y datos
router.route('/cambiarContra/:id')
    .put([verifyToken, esSocio], updatePass)
router.route('/cambiarDatos/:id')
    .put([verifyToken, esSocio], updateDataUserId)
router.route('/cambiarImagen/:id')
    .put([verifyToken, esSocio], updateImagenUserId)
module.exports = router;