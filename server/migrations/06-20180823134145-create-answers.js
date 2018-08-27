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
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // userId:{
      //   type:Sequelize.INTEGER,
      //   onDelete:'CASCADE',
      //   references:{
      //     model:'Users',
      //     key:'id',
      //     as:'userId',
      //   },
      // },
      // idQuiz:{
      //   type:Sequelize.INTEGER,
      //   onDelete:'CASCADE',
      //   references:{
      //     model:'Quizzes',
      //     key:'id',
      //     as:'idQuiz',
      //   }
      // },
      // idOption:{
      //   type:Sequelize.INTEGER,
      //   onDelete:'CASCADE',
      //   references:{
      //     model:'QuizOptions',
      //     key:'id',
      //     as:'idOption',
      //   }
      // },
      // idChapter:{
      //   type:Sequelize.INTEGER,
      //   onDelete:'CASCADE',
      //   references:{
      //     model:'Chapters',
      //     key:'id',
      //     as:'idChapter',
      //   }
      // },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Answers');
  }
};