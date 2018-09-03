'use strict';
const uuidv4 = require('uuid/v4');
var models = require('./../models');
var fs = require('fs');

class ArticuloController {
    subirArchivo(req, res) {
        var nombre = req.files.archivo.name.split(".");
        var extension = req.files.archivo.name.split(".").pop();
        var nombreArchivo = nombre[0] + "." + extension;

        fs.createReadStream(req.files.archivo.path).pipe(fs.createWriteStream("./public/archivos/" + nombreArchivo));

    }
    guardar(req, res, next) {
        var articulo = models.articulo;
        var revista = models.revista;
        var nombre = req.files.archivo.name.split(".");
        var extension = req.files.archivo.name.split(".").pop();
        var nombreArchivo = nombre[0] + "." + extension;
        console.log(req.user.id_persona + " *************8");
        revista.findOne({where: {edicion: req.body.revista}}).then(function (rev) {
            if (rev) {
                articulo.findOne({where: {titulo: nombre[0]}}).then(function (art) {
                    if (!art) {
                        var data = {
                            titulo: nombre[0],
                            url_articulo: req.body.txt_actor,
                            id_revista: articulo.id,
                            id_administrador: req.user.id
                        };
                        articulo.create(data).then(function (newArticulo, created) {
                            console.log("LO HICISTES+++++++++++++++++++++++++++++++++++++++++++++++");
                        res.redirect('/plantilla');
                        });
                    } else {
                        console.log("Ya existe");
                        res.redirect('/revistacarga');
                    }
                });
            } else {
                console.log("No existe Revista");
                        res.redirect('/revistacarga');
            }

        });


    }

}
module.exports = ArticuloController;

