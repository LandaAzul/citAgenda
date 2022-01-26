//import {createRoles} from './libs/initialSetup'
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createRoles, usersDefault } = require("./libs/initialSetup");

const app = express();
createRoles();
usersDefault();

// verificarEmpresa();

//settigs
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", require("./routes/users.js"));
    //rutas de los diferentes roles
app.use("/api/socio", require("./routes/socio.js"));
app.use("/api/administrador", require("./routes/administrador.js"));
app.use("/api/profesor", require("./routes/profesor.js"));
app.use("/api/canchero", require("./routes/canchero.js"));
    //otras rutas
app.use("/api/empresas", require("./routes/empresas.js"));
app.use("/api/citas", require("./routes/citas.js"));
app.use("/api/leccion", require("./routes/lecciones.js"));
app.use("/api/turnos", require("./routes/turnos.js"));
app.use("/api/auth", require("./routes/auth")); //auth

module.exports = app;
