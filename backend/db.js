const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("resume_app", "postgres", "4256135", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
