'use strict';
module.exports = (sequelize, DataTypes) => {
  let Chapter = sequelize.define('Chapter', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Chapter.associate = function(models) {
    Chapter.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });
    Chapter.hasMany(models.Quiz, {
      foreignKey: 'chapterId',
      as: 'quizzes'
    })
  };
  return Chapter;
};