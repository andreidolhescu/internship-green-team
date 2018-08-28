'use strict';
module.exports = (Sequelize, DataTypes) => {
  var Answers = sequelize.define('Answers', {
    score:{
      type:Sequelize.INTEGER
    }
  });
  Answers.associate = (models) =>{
    // associations can be defined here

    Answers.belongsTo(models.User,{
      foreignKey:'userId',
      onDelete:'CASCADE',
      as:'User'
    });

    Answers.belongsTo(models.Chapter,{
      foreignKey:'chapterId',
      onDelete:'CASCADE',
      as:'Chapter'
    });

    Answers.belongsTo(models.Quiz,{
      foreignKey:'quizId',
      onDelete:'CASCADE',
      as:'Quiz'
    });

    Answers.belongsTo(models.QuizOption,{
      foreignKey:'optionId',
      onDelete:'CASCADE',
      as:'chosedOption'
    });
  };
  return Answers;
};