module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserName: {
        type: DataTypes.STRING(20),
        allowNull: false,
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
      Age: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
      },
      Gender: {
        type: DataTypes.BOOLEAN,
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
    },
    {
      timestamps: false,
    }
  );

  return Users;
};
