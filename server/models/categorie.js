'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Categorie.associate = function(models) {
    Categorie.hasMany(models.Course, {
      foreignKey: 'categoryId',
      as: 'courses'
    });
  };
  return Categorie;
};