const express = require('express');
const cors = require('cors');
const app = express();

//settigs
app.set('port', process.env.PORT || 4000);


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use('/api/users', require('./routes/users.js'));
app.use('/api/empresas', require('./routes/empresas.js'));
app.use('/api/citas', require('./routes/citas.js'));
app.use('/api/leccion', require('./routes/lecciones.js'));
app.use('/api/turnos', require('./routes/turnos.js'));
app.use('/api/token', require('./routes/token.js'));


module.exports = app;
