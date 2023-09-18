module.exports = (sequelize, DataTypes) => {
  const Mobi_Validations = sequelize.define("Mobi_Validations", {
    UserID: {
      type: DataTypes.INTEGER,
    },
    MobileNo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    ServicePro: {
      type: DataTypes.STRING(25),
      allowNull: false,
    }
  },{
    updatedAt: false
  });

  return Mobi_Validations;
};
