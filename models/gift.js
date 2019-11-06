module.exports = function(sequelize, DataTypes) {
  var Gift = sequelize.define("Gift", {
    giftName: DataTypes.STRING,
    purchased: DataTypes.BOOLEAN,
    giftUrl: DataTypes.STRING,
    receipt: DataTypes.STRING
  });
  return Gift;
};
