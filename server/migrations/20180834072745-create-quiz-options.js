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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      quizzid: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Quizzes',
          key: 'id',
          as: 'quizzid',
        },
      },
      coursesid: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Courses',
          key: 'id',
          as: 'coursesid',
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('quizOptions');
  }
};