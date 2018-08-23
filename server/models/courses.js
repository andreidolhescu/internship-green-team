module.exports = (sequelize, DataTypes) => {

  const courses = sequelize.define('courses', {
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNullNull: false
    },

    courseImage: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },);
  courses.associate = (models)=> {
    // associations can be defined here
    courses.belongsTo(models.Dashboards,{
      foreignKey:'idCategory',
      onDelete:'CASCADE',
    });
    courses.hasMany(models.Chapters,{
      foreignKey:'idChapter',
      as:'coursesItems',
    });
  };
  return courses;
};

  


