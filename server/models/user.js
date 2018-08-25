'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    // TODO: Delete(all commented code) this at a later time if all goes well!
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
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
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Course, {
      foreignKey: 'userId',
      as: 'courses'
    });
  };
  return User;
};