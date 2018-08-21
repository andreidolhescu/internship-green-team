'use strict';
module.exports = (sequelize, DataTypes) => {
  const quizOptions = sequelize.define('quizOptions', {
    option1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,70]
      }
    },
    option2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,70]
      }
    },
    option3: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,70]
      }
    },
    idQuiz: {
      type: DataTypes.INTEGER,
    }
  }, {});
  
  
  quizOptions.associate = function(models) {
    // associations can be defined here
  };
  return quizOptions;
};