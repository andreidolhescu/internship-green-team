module.exports = (sequelize, DataTypes) => {

  const Dashboard = sequelize.define('Dashboard', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Dashboard.associate = function(models) {
    // associations can be defined here
  };

  return Dashboard;
};