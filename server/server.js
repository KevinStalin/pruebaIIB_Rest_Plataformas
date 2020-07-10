require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes/impresora'));


//conexion a la base de dartos

mongoose.connect(
    "mongodb+srv://kevin:kevin@pruebamongodb-6oz0y.mongodb.net/PruebaIIB?retryWrites=true&w=majority", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;
        console.log("Base de datos Online!");
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
});