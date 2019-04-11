'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserV01 = sequelize.define('UserV01', {
    test: DataTypes.STRING
  }, {});
  UserV01.associate = function(models) {
    // associations can be defined here
  };
  return UserV01;
};