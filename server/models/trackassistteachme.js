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
      foreignKey:'idProcess',
      onDelete:'CASCADE',
    });

  };
  return TrackAssistTeachMe;
};