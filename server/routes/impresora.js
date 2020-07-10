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
    Impresora.find({})
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

app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['modelo', 'color', 'ip', 'precio']);
    Impresora.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            impresora: usuarioDB
        });
    });
});

app.delete('/impresora/:id', (req, res) => {
    let id = req.params.id;
    Impresora.findByIdAndDelete(id, (err, impresoraEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!impresoraEliminado) {
            res.json({
                ok: false,
                err: {
                    message: "Impresora no encontradada",
                },
            });
        } else {
            res.json({
                ok: true,
                usuario: impresoraEliminado
            });
        }

    });
});



module.exports = app;