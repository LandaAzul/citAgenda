//const router
const { Router } = require('express');
const router = Router();

//Rutas para los usuarios
//Importamos el archivo controlador de las rutas con sus funciones 
const {getUsers, createUser, updateUserId, deleteUserId, getUserId, getUserDocumento, updateUserDocumento, deleteUserDocumento, getUserCodigo, updateUserCodigo, deleteUsercodigo} = require('../controllers/users.controllers.js')
router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id') 
//para el id
    .get(getUserId)
    .put(updateUserId)
    .delete(deleteUserId)
router.route('/documento/:documento') 
//para documento
    .get(getUserDocumento)
    .put(updateUserDocumento)
    .delete(deleteUserDocumento)
router.route('/codigo/:codigo') 
//para codigo
    .get(getUserCodigo)
    .put(updateUserCodigo)
    .delete(deleteUsercodigo)
module.exports = router;