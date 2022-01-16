const { Router } = require('express');
const router = Router();

const {singUp, singIn} = require('../controllers/auth.controllers.js')
const {checkDuplicateDocumentOrCodigoOrEmail, checkRolesExisted} = require('../middlewares')

router.route('/signUp')
    .post([checkDuplicateDocumentOrCodigoOrEmail, checkRolesExisted], singUp)

router.route("/signIn")
    .post(singIn)

    
module.exports = router;