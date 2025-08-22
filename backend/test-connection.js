const sequelize = require("./db");
const User = require("./models/User");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");

    await sequelize.sync({ force: true }); // пересоздаст таблицу
    console.log("✅ User table synced");

    const user = await User.create({ name: "Alice", email: "alice@example.com" });
    console.log("✅ Inserted:", user.toJSON());

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
