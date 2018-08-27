'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answers = sequelize.define('Answers', {});
  Answers.associate = (models) =>{
    // associations can be defined here

    Answers.belongsTo(models.User,{
      foreignKey:'userId',
      onDelete:'CASCADE'
    });

    Answers.belongsTo(models.Chapter,{
      foreignKey:'chapterId',
      onDelete:'CASCADE'
    });

    Answers.belongsTo(models.Quiz,{
      foreignKey:'quizId',
      onDelete:'CASCADE'
    });

    Answers.belongsTo(models.QuizOption,{
      foreignKey:'optionId',
      onDelete:'CASCADE',
      as:'chosedOption'
    });
  };
  return Answers;
};