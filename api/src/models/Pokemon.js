const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID, 
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },      

    image: {
      type: DataTypes.STRING
    },

    hp: {
      type: DataTypes.INTEGER
    },

    attack: {
      type: DataTypes.INTEGER
    },

    defense: {
      type: DataTypes.INTEGER
    },

    speed: {
      type: DataTypes.INTEGER
    },

    height: {
      type: DataTypes.INTEGER
    },

    weight: {
      type: DataTypes.INTEGER
    },
  },{
    timestamps: false
  }  
  );
};
