module.exports = (sequelize, DataTypes) => {

    const Dashboard = sequelize.define('Dashboard', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, 
    /*{
      classMethods: {
        associate: function(models) {
      // associations can be defined here
          Dashboard.hasMany(models.course, {
            primarykey: 'CategoryId',
            onDelete: 'CASCADE'
          });
        }
      }
    }*/);
  
    return Dashboard;
  };