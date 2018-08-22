module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define('Quizzes', {
    content: DataTypes.STRING,
  });
  
  Quizzes.associate = (models) => {
    // associations can be defined here
    Quizzes.belongsTo(models.Chapters, {
      foreignKey: 'chapterid',
      onDelete: 'CASCADE',
    });

    Quizzes.hasMany(models.quizOptions, {
      foreignKey: 'quizzid',
    });
  };

  return Quizzes;
};