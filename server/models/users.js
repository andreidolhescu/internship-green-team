'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
   
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
    forgotPassword: {
      type: DataTypes.STRING,
      defaultValue: 'default'
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
   Users.associate = function(models) {
    // associations can be defined here
    /*Users.hasMany(models.course, {
      foreignKey: 'userId',
      as: 'courses'
    });*/
  };
  return Users;
};