'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNullNull: false
    },
  });
  Course.associate = function(models) {
    //associations can be defined here

    Course.belongsTo(models.Categorie, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
    Course.hasMany(models.Chapter, {
      foreignKey: 'courseId',
      as: 'chapters'
    })
  };
  return Course;
};
