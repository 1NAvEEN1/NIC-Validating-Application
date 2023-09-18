module.exports = (sequelize, DataTypes) => {
  const NIC_Validations = sequelize.define("NIC_Validations", {
    UserID: {
      type: DataTypes.INTEGER,
    },
    NIC: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Age: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    Gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },{
    updatedAt: false
  });

  return NIC_Validations;
};
