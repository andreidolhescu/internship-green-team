'use strict';
module.exports = (sequelize, DataTypes) => {
  const quizOptions = sequelize.define('quizOptions', {
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
  }, {});
  
  
  quizOptions.associate = function(models) {
    // associations can be defined here
    quizOptions.belongsTo(models.quizzes,{
      foreignKey:'idQuiz',
      onDelete:'CASCADE'
    })
  };
  return quizOptions;
};