module.exports = (sequelize, DataTypes) => {
  const quizOptions = sequelize.define('quizOptions', {
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,70]
      }
    },
    correct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
      }
    });
  
  
  quizOptions.associate = (models) => {
    // associations can be defined here
    quizOptions.belongsTo(models.Quizzes, {
      foreignKey: 'quizzid',
    });
  };
  
  return quizOptions;
};