module.exports = (sequelize, DataTypes) => {

  const Dashboard = sequelize.define('Dashboard', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }); 
  
  Dashboard.associate = (models) => {
    Dashboard.hasMany(models.Courses, {
      foreignKey: 'dashboardid',
    });
  };

  return Dashboard;
};