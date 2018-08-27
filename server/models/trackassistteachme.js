'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrackAssistTeachMe = sequelize.define('TrackAssistTeachMe', {});
  TrackAssistTeachMe.associate = (models) =>{

    TrackAssistTeachMe.belongsTo(models.User,{
      foreignKey:'userId',
      onDelete:'CASCADE'
    });

    TrackAssistTeachMe.belongsTo(models.Categorie,{
      foreignKey:'categoryId',
      onDelete:'CASCADE'
    });

    TrackAssistTeachMe.belongsTo(models.Course,{
      foreignKey:'courseId',
      onDelete:'CASCADE'
    });

    TrackAssistTeachMe.belongsTo(models.Chapter,{
      foreignKey:'idProcess',
      onDelete:'CASCADE',
    });

  };
  return TrackAssistTeachMe;
};