"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "lyp2726@outlook.com",
        first_name: "Ryan",
        last_name: "Ler",
        company_name: "LG",
        profile_pic_url: "https://i0.wp.com/cdn.auth0.com/avatars/ly.png?ssl=1",
        contact_no: 12345678,
        job_title: "Backend Developer",
        job_role: "Others",
        industry: "Others",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
