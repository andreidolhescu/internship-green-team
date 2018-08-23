'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TrackAssistTeachMes', {
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
      idCategory:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Dashboards',
          key:'id',
          as:'idCategory',
        }
      },
      idCourse:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'courses',
          key:'id',
          as:'idCourse',
        },
      },
      idChapter:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Chapters',
          key:'id',
          as:'idChapter',
        }
      },
      idQuiz:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Quizzes',
          key:'id',
          as:'idQuiz',
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TrackAssistTeachMes');
  }
};