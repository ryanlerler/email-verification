"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      company_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profile_pic_url: {
        type: Sequelize.TEXT,
      },
      contact_no: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      job_title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      job_role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      industry: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
