const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fname: {
      type: Sequelize.STRING,
      allowNull:false
    },
    lname:{
      type: Sequelize.STRING,
      allowNull:false
    },
    email: {
      type: Sequelize.STRING,
      allowNull:false,
      unique: true, 
      validate:{
        isEmail: true
      }
    },
    username: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false
    },
    gender:{
      type: Sequelize.ENUM,
      values: ['male', 'female'],
      allowNull:false
    },
    phone: {
        type: Sequelize.INTEGER(11),       
        allowNull:false,
        validate:{
          isNumeric: true
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull:false
    },
    test: {
        type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
  }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};