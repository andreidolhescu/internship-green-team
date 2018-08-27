'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answersGiven: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.Quiz, {
      foreignKey: 'quizId',
      onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.QuizOption, {
      foreignKey: 'quizOptionId',
      onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.Chapter, {
      foreignKey: 'chapterId',
      onDelete: 'CASCADE'
    })
  };
  return Answer;
};