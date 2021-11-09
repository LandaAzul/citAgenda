const { Router } = require("express");
const router = Router();

const { verifyToken , isUser , isModerator, isAdmin } = require("../middlewares");

router.route("/");
const {
  getTurnos,
  createTurno,
  updateTurno,
  deleteTurno,
  getTurno,
} = require("../controllers/turno.controllers.js");
router.route("/")
  .get(getTurnos)
  //router.get('/', verifyToken, getTurnos)  //OTRA MANERA DE ESCRIBIR LA LINEA ANTERIOR
  .post([verifyToken, isUser], createTurno);
router.route("/:id")
  .get([verifyToken, isUser], getTurno)
  .put([verifyToken, isModerator], updateTurno)
  .delete([verifyToken, isModerator], deleteTurno);

module.exports = router;
