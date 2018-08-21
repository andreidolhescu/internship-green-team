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
    },

    idCategory: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  courses.associate = function(models) {
    // associations can be defined here
  };
  return courses;
};

  


