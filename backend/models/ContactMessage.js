// models/ContactMessage.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ContactMessage = sequelize.define("ContactMessage", {
  name: DataTypes.STRING,
  contact: DataTypes.STRING, // Telegram или email
  message: DataTypes.TEXT
});

module.exports = ContactMessage;
