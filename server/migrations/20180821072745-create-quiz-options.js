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
      answer: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [0,70]
        }
      },
      correct: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      // idQuiz: {
      //  type: Sequelize.INTEGER
      // },
      // todoId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Todos',
      //     key: 'id',
      //     as: 'todoId',
      //   },
      // },
      quizId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Quizzes',
          key: 'id',
          as: 'quizId',
        },
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