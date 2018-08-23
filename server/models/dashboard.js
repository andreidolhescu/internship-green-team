module.exports = (sequelize, DataTypes) => {

    const Dashboards = sequelize.define('Dashboards', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, 
    );
    Dashboards.associate = (models)=> {
      // associations can be defined here
      Dashboards.hasMany(models.courses,{
        foreignKey:'idCategory',
        as:'categoryItems',
      });
    };
  
    return Dashboards;
  };