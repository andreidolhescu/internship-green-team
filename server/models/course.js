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

    small_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    long_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idCategory: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Categories',
        key: 'id',
        as: 'idCategory'
      }
    }

  });

  Courses.associate = (models) => {
    // associations can be defined here
    Courses.belongsTo(models.Categories, {
      foreignKey: 'idCategory',
      onDelete: 'CASCADE',
    });

    Courses.hasMany(models.Chapters, {
      foreignKey: 'coursesid',
    });
  };
  return Courses;
};