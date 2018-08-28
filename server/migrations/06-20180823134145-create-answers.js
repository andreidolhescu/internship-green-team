'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Users',
          key:'id',
          as:'userId',
        },
      },
      chapterId:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Chapters',
          key:'id',
          as:'chapterId',
        }
      },
      quizId:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Quizzes',
          key:'id',
          as:'quizId',
        }
      },
      optionId:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'QuizOptions',
          key:'id',
          as:'optionId',
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Answers');
  }
};