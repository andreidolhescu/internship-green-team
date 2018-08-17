module.exports = (sequelize, DataTypes) => {

  const course = sequelize.define('course', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    courseImage: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  course.associate = function(models) {
    // associations can be defined here
  };
  return course;
};