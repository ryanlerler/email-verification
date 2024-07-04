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
      first_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      company_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profile_pic_url: {
        type: DataTypes.TEXT,
      },
      contact_no: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      job_title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      job_role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      industry: {
        allowNull: false,
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
