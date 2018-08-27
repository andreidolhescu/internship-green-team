module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define('Quizzes', {
<<<<<<< Updated upstream
    content: DataTypes.STRING,
    idChapter:DataTypes.INTEGER
=======
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,70]
      }
    },
    //idChapter:DataTypes.INTEGER
>>>>>>> Stashed changes
  }, {});
  
  Quizzes.associate = function(models) {
    // associations can be defined here
    // Todo.hasMany(models.TodoItem, {
    //   foreignKey: 'todoId',
    //   as: 'todoItems',
    // });
    Quizzes.hasMany(models.quizOptions, {
      foreignKey: 'quizId',
      as: 'quizOptions',
    });
  };
  return Quizzes;
};