module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define('Quizzes', {
    content: DataTypes.STRING
  }, {});
  
  Quizzes.associate = function(models) {
    // associations can be defined here
    Quizzes.belongsTo(models.chapter,{
      foreignKey:'idChapter',
      onDelete:'CASCADE'
    })
  };
  return Quizzes;
};