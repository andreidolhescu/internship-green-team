module.exports = (sequelize, DataTypes) => {

  const Courses = sequelize.define('Courses', {
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

  });

  Courses.associate = (models) => {
    // associations can be defined here
    Courses.belongsTo(models.Dashboard, {
      foreignKey: 'dashboardid',
      onDelete: 'CASCADE',
    });

    Courses.hasMany(models.Chapters, {
      foreignKey: 'coursesid',
    });
  };
  return Courses;
};