module.exports = function (sequelize, Sequelize) {
    var Administrador = sequelize.define('administrador', {
        id_admin: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING (60),
            notEmpty: true
        },
        correo: {
            type: Sequelize.STRING (60),
            notEmpty: true,

            validate: {
                isEmail: true
            }
        },
        external_id: {
            type: Sequelize.UUID
        }
    });
     Administrador.associate = function (models) {
        models.administrador.hasMany(models.articulo, {            
            foreignKey: 'id_administrador'
        });
    }; 
    return Administrador;
};