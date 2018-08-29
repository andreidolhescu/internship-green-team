'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,100]
      }
    },
    userImage: {
      type: DataTypes.STRING,
      defaultValue: 'https://i.imgur.com/ksFewDB.jpg'
    },
    forgotPassword: {
      type: DataTypes.STRING,
      defaultValue: 'default'
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    
    // User.belongsTo(models.Course, {
    //   foreignKey: 'courseId',
    //   onDelete: 'CASCADE'
    // });
    
    User.hasMany(models.Course, {
      foreignKey: 'userId',
      as: 'courses'
    })

    User.hasMany(models.Answer, {
      foreignKey: 'userId',
      as: 'answers'
    })
  };
  return User;
};