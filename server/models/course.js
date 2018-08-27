module.exports = (sequelize, DataTypes) => {

  const Course = sequelize.define('Course', {
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    small_description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,70]
      }
    },
    long_description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,150]
      }
    },
    courseImage: {
      type: DataTypes.STRING,
      allowNull: false
    },

    tags: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });

  Course.associate = (models) => {
    // associations can be defined here
    Course.belongsTo(models.Categories, {
      foreignKey: 'idCategory',
      onDelete: 'CASCADE',
    });

    Course.hasMany(models.Chapters, {
      foreignKey: 'coursesid',
    });

    Course.hasMany(models.Quizzes, {
      foreignKey: 'coursesid',
    });

    Course.hasMany(models.quizOptions, {
      foreignKey: 'coursesid',
    });

    Course.belongsToMany(models.Users, {
      through: 'UserCourses'
    });
  };
  return Course;
};