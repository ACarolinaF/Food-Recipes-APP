const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, //esta sera mi clave primaria, o sea, el Id
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    score:{ //spoonacularScore
      type: DataTypes.INTEGER,
    },
    healthScore:{
      type: DataTypes.INTEGER
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.STRING) //confirmar
      //type: Datatypes.ARRAY(DataTypes.STRING)
    },
    readyInMinutes:{
      type: DataTypes.INTEGER
    },
    servings:{
      type: DataTypes.INTEGER
    }
    // dishTypes:{

    // }

    //mirar si quiero adicionar otras columnas:
    // - Image

  });
};
