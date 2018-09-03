module.exports = function (sequelize, Sequelize) {
    var Noticia = sequelize.define('noticia', {
       id: {
           primaryKey: true,
           type: Sequelize.INTEGER
       },
       url: {
           type: Sequelize.STRING (100)
       },
       usuario: {
           type: Sequelize.STRING (100)
       }
    });
    return Noticia;
};