module.exports = function(sequelize, DataTypes) {
    var Recipient = sequelize.define("Recipient", {
      recipientID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      recipient_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      timestamps: false
    });
    Recipient.removeAttribute("createdAt");
    Recipient.removeAttribute("updatedAt");
    return Recipient
   };