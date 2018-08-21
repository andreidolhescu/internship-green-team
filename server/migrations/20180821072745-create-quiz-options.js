'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quizOptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      option1: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [0,70]
        }
      },
      option2: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [0,70]
        }
      },
      option3: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [0,70]
        }
      },
      idQuiz: {
       type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('quizOptions');
  }
};