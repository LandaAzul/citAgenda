const { Router } = require('express');
const router = Router();

const {singUp, singIn} = require('../controllers/auth.controllers.js')
const {checkDuplicateUsernameOrEmail, checkRolesExisted} = require('../middlewares')

router.route('/signUp')
    .post([checkDuplicateUsernameOrEmail, checkRolesExisted], singUp)

router.route("/signIn")
    .post(singIn)

    
module.exports = router;