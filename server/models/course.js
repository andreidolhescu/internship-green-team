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
    },

    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  },/* {
    classMethods: {
      associate: function(models) {
        course.belongsTo(models.Dashboard, {
          foreignKey: 'CategoryId',
          onDelete: 'CASCADE'
        });
      }
    }
  }*/);
  return course;
}
  

 