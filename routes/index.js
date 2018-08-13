var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/plantilla', function (req, res, next) {
    res.render('plantilla', {title: 'Inicio', archivo: "./dinamik/home", r: false});
});


router.get('/', function (req, res, next) {
    res.render('login');
});

/* GET Revista. */
router.get('/revista', function (req, res, next) {
    res.render('plantilla', {title: 'Inicio', archivo: "./dinamik/revista", r: true});
});

//GET Nueva Revista
router.get('/new/revista', function (req, res, next) {
    res.render('plantilla', {title: 'Inicio', archivo: "./dinamik/crear_revista", r: true, h1: 'Registrar Nueva Edicion', blokq: "En esta seccion se puede crear una nueva edicion de la revista."});
});

//GET Nueva Revista
router.get('/new/articulo', function (req, res, next) {
    res.render('plantilla', {title: 'Inicio', archivo: "./dinamik/crear_articulo", r: true, h1: 'Registrar Nuevo Articulo', blokq: "En esta seccion se Puede crear articulos para una edicion de la Revista."});
});

router.get('/new/perfil', function (req, res, next) {
    res.render('plantilla', {title: 'Inicio', archivo: "./dinamik/vistaadministrador", r: true, h1: 'perfil', blokq:" Se ve el perfil"});
});


module.exports = router;
