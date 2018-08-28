'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type:DataTypes.STRING,
      defaultValue: '#00f2fe'
    }
  });
  Categorie.associate = function(models) {
    Categorie.hasMany(models.Course, {
      foreignKey: 'categoryId',
      as: 'courses'
    });
  };
  return Categorie;
};