'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuizOption = sequelize.define('QuizOption', {
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
    // QuizOption.hasOne(models.Answer, {
    //   foreignKey: 'quizOptionId',
    //   as: 'answers'
    // })
  };
  return QuizOption;
};