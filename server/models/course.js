module.exports = (sequelize, DataTypes) => {

  const Course = sequelize.define('Course', {
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    small_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    long_description: {
      type: DataTypes.STRING,
      allowNull: false
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
  };
  return Course;
};