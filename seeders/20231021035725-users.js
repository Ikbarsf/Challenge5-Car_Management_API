"use strict";

const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Heri",
        address: "Jember",
        age: 20,
        role: "Super Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rafi",
        address: "Jember",
        age: 21,
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Perdana",
        address: "Jember",
        age: 21,
        role: "Member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await User.findAll();

    await queryInterface.bulkInsert(
      "Auths",
      [
        {
          email: "heri@mail.com",
          password:
            "$2b$10$usyX0bt4MaVNkh6H7VPEde.LMws5yRdM8S17qsqvIuBxZRoNhkqhW",
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "rafi@mail.com",
          password:
            "$2b$10$m8.uHnS/JKn5/DwibTnKO.U8w1zYEjSnv0hhJCFStsldnv53F5OR2",
          userId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "dana@mail.com",
          password:
            "$2b$10$rOz.mEg9shJLjm4J9TRvsOXu3fcHfsVy9Wcq2eBkfmXLqOil96slu",
          userId: users[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
