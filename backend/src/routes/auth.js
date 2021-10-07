const { Router } = require('express');
const router = Router();

import * as authCtrl from "../controllers/auth.controllers"

router.post('signUp', authCtrl.signUp)

router.post('signIn', authCtrl.signIn)


export default router; 