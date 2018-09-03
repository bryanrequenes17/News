var express = require('express');
var router = express.Router();
var archivo = require('../controllers/revistaController');
var arcController = new archivo();
/* GET home page. */
router.get('/home', function (req, res, next) {
    res.render('plantilla', {title: 'Inicio', archivo: "./dinamik/home", r: false});
});


router.get('/', function (req, res, next) {
    res.render('login');
});

router.get('/crear_revista', function (req, res, next) {
    res.render('plantilla', {title: 'Inicio', archivo: "./dinamik/crear_revista", r: true, h1: 'Edición de revista'});
});

router.get('/new/perfil', function (req, res, next) {
    res.render('plantilla', {title: 'Inicio', archivo: "./dinamik/vistaadministrador", r: true, h1: 'perfil', blokq: " Se ve el perfil"});
});

router.get('/cargaarchivo', function (req, res, next) {
    res.render('plantilla_1', {title: 'Inicio', archivo: "cargadatos", r: true, h1: 'Suba su archivo', blokq: "En esta seccion agrega nuevo archivo a su revista."});
});


router.get('/listaarticulos', function (req, res, next) {
    res.render('plantilla_1',{title: 'Inicio', archivo: "listar_articulos", r: true, h1: 'Nueva Edición de revista' , blokq: " Se da de alta una nueva revista para crearce"});
});

router.get('/cargar_edicion', function (req, res, next) {
    res.render('plantilla_1',{title: 'Inicio', archivo: "./dinamik/crear_revista", r: true, h1: 'Nueva Edición de revista' , blokq: " Se da de alta una nueva revista para crearce"});
});


router.get('/guardar/usuario', function (req, res, next){
    console.log(req.body.firstname+"*************************************");
});

router.get('/convertir_a_revista', function(req, res, next) {
  res.render('./externo/convertir_a_revista');
});

router.get('/unirpdf', function(req, res, next) {
  res.render('./externo/unir_pdf');
});

router.get('/listar', function(req, res, next) {
  res.render('./listar_articulos');
});

router.post('/crearedicion', arcController.registrarRevista);
router.post('/convertidor_revista', arcController.guardarUrlyLinkRevista);

router.get('/mostrarArticulo', function (req, res, next) {
    var models = require('./../models');
    var articulo = models.articulo;
    console.log('**********************************************************');
    articulo.findAll().then(function (articulo) {
        console.log(articulo+'*****************************');
        res.send(articulo);
    });
});

router.post('/eliminarArticulo',function (req, res, next){
    var models = require('./../models');
    var articulo = models.articulo;
    console.log('******************************************'+req.body.id_articulo+'***************************************************');
    articulo.destroy({where: {id_articulo: req.body.id_articulo}}).then(function (){
        console.log('Te Eliminaste***************************************************');
        res.redirect('/listar');
    });
});

router.post('/multipart/subirruta', function (req, res, next) {
    var fs = require('fs');
    var models = require('./../models');
    var articulo = models.articulo;
    var revista = models.revista;
    var nombre = req.files.archivo.name.split(".");
    var extension = req.files.archivo.name.split(".").pop();
    var nombreArchivo = nombre[0] + "." + extension;

    console.log(req.files.archivo.path + "+++++++" + nombre[0] + "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    fs.createReadStream(req.files.archivo.path).pipe(fs.createWriteStream("./public/archivos/" + nombreArchivo));
    console.log(nombreArchivo + "-------------");
    revista.findOne({where: {edicion: req.body.revista}}).then(function (rev) {
        if (rev) {
            articulo.findOne({where: {titulo: nombre[0]}}).then(function (art) {
                if (!art) {
                    var x = 1;
                    var data = {
                        titulo: nombre[0],
                        url_articulo: nombreArchivo,
                        id_administrador: x,
                        id_revista: 1

                    };
                    articulo.create(data).then(function (newPelicula, created) {
                        console.log("LO HICISTES+++++++++++++++++++++++++++++++++++++++++++++++");
                        res.redirect('/listaarticulos');
                    });
                } else {
                    console.log("Ya existe");
                    res.redirect('/cargaarchivo');
                }
            });
        } else {
            console.log("No existe Revista");
            res.redirect('/cargaarchivo');
        }

    });
});
module.exports = router;
