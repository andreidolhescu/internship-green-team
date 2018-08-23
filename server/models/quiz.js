'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quiz = sequelize.define('Quiz', {
    content: DataTypes.STRING,
  });
  Quiz.associate = function(models) {
    // associations can be defined here
    Quiz.belongsTo(models.Chapter,{
      foreignKey:'idChapter',
      onDelete:'CASCADE',
    })
    Quiz.hasMany(models.QuizOption,{
      foreignKey:'idQuiz',
      as:'quizOptions',
    });
  };
  return Quiz;
};