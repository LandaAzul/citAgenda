const { Router } = require("express");
const router = Router();
const { verifyToken, isUser , isModerator, isAdmin } = require("../middlewares");

router.route("/");
const {
  getLecciones,
  createLeccion,
  updateLeccion,
  deleteLeccion,
  getLeccion,
} = require("../controllers/lecciones.controllers.js");
router.route("/")
.get(getLecciones)
.post([verifyToken, isUser], createLeccion);

router.route("/:id")
.get([verifyToken, isUser], getLeccion)
.put([verifyToken, isModerator], updateLeccion)
.delete([verifyToken, isModerator], deleteLeccion);

module.exports = router;
