const { Router } = require('express');
const router = Router();

const {singUp, singIn,forgotPassword,newPassword} = require('../controllers/auth.controllers.js')
const {checkDuplicateDocumentOrCodigoOrEmail, checkRolesExisted} = require('../middlewares')

router.route('/signUp')
    .post([checkDuplicateDocumentOrCodigoOrEmail, checkRolesExisted], singUp)

router.route("/signIn")
    .post(singIn)

router.route("/forgot-password")
    .put(forgotPassword)

router.route("/new-password")
    .put(newPassword)
module.exports = router;