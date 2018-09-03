module.exports = function (sequelize, Sequelize) {
    var aux = require('../models/administrador');
    var admin = new aux(sequelize, Sequelize);

    var aux2 = require('../models/revista');
    var revista = new aux2(sequelize, Sequelize);

    var Articulo = sequelize.define('articulo', {
        id_articulo: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        url_articulo: {
            type: Sequelize.STRING(60)
        },
        titulo: {
            type: Sequelize.STRING(60)
        },
        external_id: {
            type: Sequelize.UUID
        }
    });
    Articulo.belongsTo(admin, {foreignKey: 'id_administrador', constraints: false});
    Articulo.belongsTo(revista, {foreignKey: 'edicion', constraints: false});

    return Articulo;
};
