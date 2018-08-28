'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCourse = sequelize.define('UserCourse', {
      

  });
  UserCourse.associate = function(models) {
    // associations can be defined here
  };
  return UserCourse;
};