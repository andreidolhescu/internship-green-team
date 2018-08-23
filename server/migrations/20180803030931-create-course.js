module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      small_description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [0,70]
        }
      },
      long_description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [0,150]
        }
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: false
      },
      courseImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idCategory: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
          as: 'idCategory'
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Courses');
  }
};