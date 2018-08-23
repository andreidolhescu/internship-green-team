module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('Chapters', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING,
      validate:{len:[0,500]
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
    coursesid: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Courses',
        key: 'id',
        as: 'coursesid',
      },
    },
  });
},
down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('Chapters');
}
};