'use strict';

var models = require('./../models');
var revista = models.revista;

class revistaController {

    registrarRevista(req, res, next) {
        revista.findOne({where: {url_revista: req.body.url_revista}}).then(function (documento) {
            if (!documento) {
                var data = {
                    edicion: req.body.edicion,
                    fecha: req.body.fecha
                };
                revista.create(data).then(function (newDoc, created) {
                    if (newDoc) {
                        console.log("Se ha guardado");
                        res.redirect('/cargar_edicion');
                    } else {
                        res.redirect('/cargar_edicion');
                    }
                });
            } else {
                console.log("Ya existe");
                res.redirect('/ver');
            }
        });
    }
    guardarUrlyLinkRevista(req, res, next) {
        revista.findOne({where: {edicion: req.body.edicion}}).then(function (documento) {
            if (!documento) {
                var data = {
                    edicion: edicion[0],
                    portada: req.body.portada,
                    url_revista: req.body.url_revista,
                    fecha: fecha[3]
                };
                revista.create(data).then(function (newDoc, created) {
                    if (newDoc) {
                        console.log("Se ha guardado");
                        res.redirect('/cargar_edicion');
                    } else {
                        res.redirect('/cargar_edicion');
                    }
                });
            } else {
                console.log("Ya existe");
                res.redirect('/ver');
            }
        });
    }
}
module.exports = revistaController;


