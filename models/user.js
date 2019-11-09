module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    handle: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false
  });
  users.removeAttribute("createdAt");
  users.removeAttribute("updatedAt");
  return users
};