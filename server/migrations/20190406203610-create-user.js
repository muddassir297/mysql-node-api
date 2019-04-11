'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
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
          type: Sequelize.INTEGER,       
          allowNull:false,
          validate:{
            isNumeric: true, 
          }
      },
      address: {
          type: Sequelize.STRING,
          allowNull:false
      },
      role: {
          type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};