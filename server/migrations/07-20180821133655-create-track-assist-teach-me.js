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
      categoryId:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Categories',
          key:'id',
          as:'categoryId',
        }
      },
      courseId:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Courses',
          key:'id',
          as:'courseId',
        },
      },
      idProcess:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Answers',
          key:'id',
          as:'idProcess',
        }
      },

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TrackAssistTeachMes');
  }
};