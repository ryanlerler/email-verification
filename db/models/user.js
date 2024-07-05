"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      companyName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profilePicUrl: {
        type: DataTypes.TEXT,
      },
      contactNo: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      jobTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      jobRole: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      industry: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      auth0UserId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
