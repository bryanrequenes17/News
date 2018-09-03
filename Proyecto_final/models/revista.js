module.exports = function (sequelize, Sequelize) {
    var Revista = sequelize.define('revista', {
        edicion: {
            primaryKey: true,
            type: Sequelize.STRING (30)
        },
        portada: {
            type: Sequelize.BLOB
        },
        url_revista: {
            type: Sequelize.STRING (100)
        },
        fecha: {
            type: Sequelize.DATE
        },
        external_id: {
            type: Sequelize.UUID
        }
    });
     Revista.associate = function (models) {
        models.revista.hasMany(models.articulo, {            
            foreignKey: 'edicion'
        });
    }; 
    return Revista;
};