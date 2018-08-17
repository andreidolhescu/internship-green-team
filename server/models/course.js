'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sumary: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });
  Course.associate = function(models) {
    // associations can be defined here
    // Course.belongsTo(models.Category, {
    //   foreignKey: 'categoryId',
    //   onDelete: 'CASCADE'
    // });

    // Course.hasMany(models.Image, {
    //   foreignKey: 'courseId',
    //   as: 'images'
    // });

    // Course.hasMany(models.Chapter, {
    //   foreignKey: 'courseId',
    //   as: 'chapters'
    // });
  };
  return Course;
};