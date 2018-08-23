module.exports = (sequelize, DataTypes) => {

  const Categories = sequelize.define('Categories', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }); 
  
  Categories.associate = (models) => {
    Categories.hasMany(models.Courses, {
      foreignKey: 'idCategory',
      as: 'courseItems'
    });
  };

  return Categories;
};