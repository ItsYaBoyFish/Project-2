module.exports = function(sequelize, DataTypes) {
  var Gift = sequelize.define("Gift", {
    giftID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      primaryKey: true
    },
    gift_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gift_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receipt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipientID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Gift.removeAttribute("createdAt");
  Gift.removeAttribute("updatedAt");
  return Gift
};