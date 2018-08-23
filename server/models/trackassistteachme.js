'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrackAssistTeachMe = sequelize.define('TrackAssistTeachMe', {});
  TrackAssistTeachMe.associate = (models) =>{

    TrackAssistTeachMe.belongsTo(models.Users,{
      foreignKey:'userId',
      onDelete:'CASCADE'
    });

    TrackAssistTeachMe.belongsTo(models.Dashboards,{
      foreignKey:'idCategory',
      onDelete:'CASCADE'
    });

    TrackAssistTeachMe.belongsTo(models.courses,{
      foreignKey:'idCourse',
      onDelete:'CASCADE'
    });

    TrackAssistTeachMe.belongsTo(models.Chapters,{
      foreignKey:'idChapter',
      onDelete:'CASCADE',
    });

    TrackAssistTeachMe.belongsTo(models.Quizzes,{
      foreignKey:'idQuiz',
      onDelete:'CASCADE',
    });

    TrackAssistTeachMe.belongsTo(models.quizOptions,{
      foreignKey:'idOption',
      onDelete:'CASCADE',
    });

  };
  return TrackAssistTeachMe;
};