const express = require('express');
const cors = require('cors');
const app = express();

//settigs
app.set('port', process.env.PORT || 4000);


//middlewares
app.use(cors());
app.use(express.json());


//routes
app.use('/api/users', require('./routes/users.js'))
app.use('/api/citas', require('./routes/citas.js'))



module.exports = app;
