'use strict';
module.exports = (sequelize, DataTypes) => {
  var Chapter = sequelize.define('Chapter', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseId:{
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Course',
        key: 'id',
        as: 'courseId'
      },
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