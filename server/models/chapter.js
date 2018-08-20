'use strict';
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
    idCourse:{
      type:DataTypes.INTEGER,
      allowNull: false
    }

  });
  Chapters.associate = function(models) {
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
  return Chapters;
};