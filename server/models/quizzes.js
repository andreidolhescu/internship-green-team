'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quizzes = sequelize.define('Quizzes', {
    content: DataTypes.STRING,
    idCourse:DataTypes.INTEGER
  }, {});
  Quizzes.associate = function(models) {
    // associations can be defined here
  };
  return Quizzes;
};