module.exports = (sequelize, DataTypes) => {
    const DetallesPedidos = sequelize.define('detalles_pedidos', {
      id_detalles_pedidos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      plantilla_modificada:{
        type: DataTypes.STRING,
      },
      cantidad:{
        type: DataTypes.STRING,
      },

      textos:{
        type: DataTypes.STRING,
      },
      colores:{
        type: DataTypes.STRING,
      },
      fonts:{
        type: DataTypes.STRING,
      },
      imagenes_subidas:{
        type: DataTypes.STRING,
      },
      color:{
        type: DataTypes.STRING,
      },
      tamano_nombre:{
        type: DataTypes.STRING,
      },

      borrado:{
        type: DataTypes.INTEGER,
      },
    },
      {
        freezeTableName: true
      }
    );
    DetallesPedidos.associate = (models) => {
        DetallesPedidos.belongsTo(models.pedidos);
        DetallesPedidos.belongsTo(models.precios);
    };
    return DetallesPedidos;
  }
  