const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Description: {
      type: DataTypes.STRING,
      
    },

    released: {
      type: DataTypes.DATEONLY,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    plataforms: {
      type: DataTypes.STRING,
      
    }

  },{
    timestamp: false
  });
};
