const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, //esta sera mi clave primaria, o sea, el Id
      allowNull: false
    },
    name:{
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
      // type: DataTypes.STRING
    },
    readyInMinutes:{
      type: DataTypes.INTEGER
    },
    servings:{
      type: DataTypes.INTEGER
    },
    // dishTypes:{

    // }

    //mirar si quiero adicionar otras columnas:
    // - Image



    
    //para poder acceder más facilmente a los que yo cree en base de datos le pongo 
    //la seguinte info que solo lo tendra los creados por mi:

    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  });
};
