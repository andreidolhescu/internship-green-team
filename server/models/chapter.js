'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content:{
      type: DataTypes.STRING(500),
      allowNull: false
    } 
  });
  Chapter.associate = function(models) {
    // associations can be defined here
     
    // Chapter.belongsTo(models.Course, {
    //   foreignKey: 'courseId',
    //   onDelete: 'CASCADE'
    // });

    // Chapter.hasMany(models.Question, {
    //   foreignKey: 'chapterId',
    //   as: 'question'
    // });

    // Chapter.hasMany(models.Answer, {
    //   foreignKey: 'chapterId',
    //   as: 'answers'
    // });
  };
  return Chapter;
};