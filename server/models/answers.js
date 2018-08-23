'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answers = sequelize.define('Answers', {});
  Answers.associate = (models) =>{
    // associations can be defined here

    Answers.belongsTo(models.Users,{
      foreignKey:'userId',
      onDelete:'CASCADE'
    });

    Answers.belongsTo(models.Quizzes,{
      foreignKey:'idQuiz',
      onDelete:'CASCADE'
    });

    Answers.belongsTo(models.quizOptions,{
      foreignKey:'idOption',
      onDelete:'CASCADE',
      as:'chosedOption'
    });

    Answers.belongsTo(models.Chapters,{
      foreignKey:'idChapter',
      onDelete:'CASCADE'
    });

  };
  return Answers;
};