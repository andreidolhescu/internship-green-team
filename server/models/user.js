module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Users.associate = (models) => {
    // associations can be defined here
  };
  return Users;
};