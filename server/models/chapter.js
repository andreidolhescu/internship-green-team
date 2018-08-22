module.exports = (sequelize, DataTypes) => {
  const Chapters = sequelize.define('Chapters', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content:{
      type: DataTypes.STRING(500),
      allowNull: false
    },

  });

  Chapters.associate = (models) => {
    // associations can be defined here
     
    Chapters.belongsTo(models.Courses, {
      foreignKey: 'coursesid',
      onDelete: 'CASCADE',
    });

    Chapters.hasMany(models.Quizzes, {
      foreignKey: 'chaptersid',
    });
  };

  return Chapters;
};