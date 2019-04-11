'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('Users', {    
          test: {
            type: Sequelize.STRING
          }
        })
      ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};