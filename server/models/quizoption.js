'use strict';
module.exports = (sequelize, DataTypes) => {
  var QuizOption = sequelize.define('QuizOption', {
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,70]
      }
    },
    correct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  QuizOption.associate = function(models) {
    // associations can be defined here
    QuizOption.belongsTo(models.Quiz,{
      foreignKey:'quizId',
      onDelete:'CASCADE',
    });
  };
  return QuizOption;
};