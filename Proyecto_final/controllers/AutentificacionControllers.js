'use strict';
const uuidv4 = require('uuid/v4');
var bCrypt = require('bcrypt-nodejs');
class AutentificacionControllers {
    signup(req, res) {
        res.render('template/templateI', {title: 'Inicio de sesion', login: false,
            fragmento: '../fragmentos/registro/registro'});
    }
    signin(req, res) {
        res.render('template/templateI', {title: 'Inicio de sesion', login: false,
            fragmento: '../fragmentos/registro/login'});
    }
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }
    
    logout(req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    }
}
module.exports = AutentificacionControllers;