module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define('Quizzes', {
    content: DataTypes.STRING,
  });
  
  Quizzes.associate = (models) => {
    // associations can be defined here
    Quizzes.belongsTo(models.Chapters, {
      foreignKey: 'chaptersid',
      onDelete: 'CASCADE',
    });

    Quizzes.hasMany(models.quizOptions, {
      foreignKey: 'quizzid',
    });

    Quizzes.belongsTo(models.Course, {
      foreignKey: 'coursesid',
      onDelete: 'CASCADE'
    })
  };

  return Quizzes;
};