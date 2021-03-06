'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // courseId:{
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Courses',
      //     key: 'id',
      //     as: 'courseId'
      //   }
      // },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName:   {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [8,100]
        }
      },
      forgotPassword: {
        type: Sequelize.STRING,
        defaultValue: 'default'
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userImage: {
        type: Sequelize.STRING,
        defaultValue: 'https://i.imgur.com/ksFewDB.jpg'
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
    return queryInterface.dropTable('Users');
  }
};