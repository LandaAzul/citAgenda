//const router
const { Router } = require('express');
const router = Router();
const {verifyToken, isModerator, isAdmin, checkRolesExisted} = require('../middlewares')
//Rutas para los usuarios
//Importamos el archivo controlador de las rutas con sus funciones 
const {getUsers, createUser, updateUserId, deleteUserId, getUserId, getUserDocumento, updateUserDocumento, deleteUserDocumento, getUserCodigo, updateUserCodigo, deleteUsercodigo} = require('../controllers/users.controllers.js')
router.route('/')
    .get([verifyToken, isModerator], getUsers)
    //.post(createUser)
    .post([verifyToken, isAdmin, checkRolesExisted], createUser)
router.route('/:id') 
//para el id
    .get([verifyToken, isModerator], getUserId)
    .put([verifyToken, isAdmin, checkRolesExisted], updateUserId)
    .delete([verifyToken, isAdmin], deleteUserId)
router.route('/documento/:documento') 
//para documento
    .get([verifyToken, isModerator], getUserDocumento)
    .put([verifyToken, isAdmin, checkRolesExisted], updateUserDocumento)
    .delete([verifyToken, isAdmin], deleteUserDocumento)
router.route('/codigo/:codigo') 
//para codigo
    .get([verifyToken, isModerator], getUserCodigo)
    .put([verifyToken, isAdmin, checkRolesExisted], updateUserCodigo)
    .delete([verifyToken, isAdmin], deleteUsercodigo)
module.exports = router;