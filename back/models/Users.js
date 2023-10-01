module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      UserName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NIC: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      DOB: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      Gender: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MobileNo: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      ServiceProvider: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      timestamps: false,
    }
  );

  return Users;
};
