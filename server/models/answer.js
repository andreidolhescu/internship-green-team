module.exports = (sequelize, DataTypes) => {

  const Answer = sequelize.define('Answer', {});

  Answer.associate = (models) => {
    // associations can be defined here
    Answer.belongsTo(models.Users, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });

    Answer.belongsTo(models.Quizzes, {
    foreignKey: 'quizzid',
    onDelete: 'CASCADE'
    });

    Answer.belongsTo(models.quizOptions, {
      foreignKey: 'quizOptionid',
      onDelete: 'CASCADE',
      as: 'chosedOption'
    });

    Answer.belongsTo(models.Chapters, {
      foreignKey: 'chaptersid',
      onDelete: 'CASCADE'
    });
  };
  return Answer;
};