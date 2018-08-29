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
    imagePath: {
      type:DataTypes.STRING,
      defaultValue: 'https://i.imgur.com/ute7gNW.jpg'
    }
  });
  Course.associate = function(models) {
    //associations can be defined here

    // Course.hasMany(models.User, {
    //   foreignKey: 'courseId',
    //   as: 'users'
    // })

    Course.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

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
