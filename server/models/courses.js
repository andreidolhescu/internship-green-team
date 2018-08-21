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
  }, {});
  courses.associate = function(models) {
    // associations can be defined here
    courses.belongsTo(models.dashboard,{
      foreignKey:'idCategory',
      onDelete:'CASCADE'
    })
  };
  return courses;
};

  


