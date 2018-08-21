'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrackAssistTeachMe = sequelize.define('TrackAssistTeachMe', {});
  TrackAssistTeachMe.associate = function(models) {
    TrackAssistTeachMe.belogsTo(models.users,{
      foreignKey:'userId',
      onDelete:'CASCADE'
    });
    TrackAssistTeachMe.belogsTo(models.dashboard,{
      foreignKey:'idCategory',
      onDelete:'CASCADE'
    });
    TrackAssistTeachMe.belogsTo(models.courses,{
      foreignKey:'idCourse',
      onDelete:'CASCADE'
    });
    TrackAssistTeachMe.belogsTo(models.chapter,{
      foreignKey:'idChapter',
      onDelete:'CASCADE'
    });
    TrackAssistTeachMe.belogsTo(models.quizzes,{
      foreignKey:'idQuiz',
      onDelete:'CASCADE'
    });
    TrackAssistTeachMe.belogsTo(models.quizoptions,{
      foreignKey:'idOption',
      onDelete:'CASCADE'
    });
  };
  return TrackAssistTeachMe;
};