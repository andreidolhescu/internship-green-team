'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    content: DataTypes.STRING,
  });
  Quiz.associate = function(models) {
    // associations can be defined here
    Quiz.belongsTo(models.Chapter,{
      foreignKey:'chapterId',
      onDelete:'CASCADE',
    })
    Quiz.hasMany(models.QuizOption,{
      foreignKey:'quizId',
      as:'quizOptions',
    });
    Quiz.hasMany(models.Answer, {
      foreignKey: 'quizId',
      as: 'answers'
    })
  };
  return Quiz;
};