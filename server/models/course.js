'use strict';
module.exports = (sequelize, DataTypes) => {
  let Course = sequelize.define('Course', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      },
    },
    categoryId:{
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Categorie',
        key: 'id',
        as: 'categoryId'
      },
    }
  });
  Course.associate = function(models) {
    //associations can be defined here
    Course.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
    Course.belongsTo(models.Categorie, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    })
    Course.hasMany(models.Chapter, {
      foreignKey: 'courseId',
      as: 'chapters'
    })
  };
  return Course;
};