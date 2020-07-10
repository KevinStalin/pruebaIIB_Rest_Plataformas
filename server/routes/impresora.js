const express = require('express');
const bcrypt = require('bcrypt');
const Impresora = require('../models/impresora');
const _ = require('underscore')


const app = express();

app.get('/impresora', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);
    //              Filtrar
    Impresora.find({}, 'nombre email role estado')
        .skip(desde)
        .limit(limite)
        .exec((err, impresoras) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                impresora: impresoras
            });
            /*
            Impresora.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios: impresoras,
                    numero: conteo
                });
            });
            */
        });
});

app.post('/impresora', (req, res) => {
    let body = req.body
    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        ip: body.ip,
        contador: body.contador,
        precio: body.precio,

    });
    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: impresoraDB
        });
    });
});


module.exports = app;