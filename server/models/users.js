'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};