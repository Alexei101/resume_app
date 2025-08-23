// server.js
const { Sequelize } = require("sequelize");
const sequelize = require("./db");
const express = require("express");
const path = require("path");
const cors = require("cors");
const amqp = require("amqplib");
const ContactMessage = require("./models/ContactMessage");

const app = express();
app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 3000;;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// POST /contact — добавление сообщения
app.post("/contact", async (req, res) => {
  try {
    const { name, contact, message } = req.body;
	const newMessage = await ContactMessage.create({ name, contact, message });
    const text = `📩 Новое сообщение!\n\n👤 Имя: ${name}\n📞 Контакт: ${contact}\n💬 Сообщение:\n${message}`;
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });
    res.status(200).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /analytics — простая аналитика
app.get("/analytics", async (req, res) => {
  try {
    const messages = await ContactMessage.findAll();
    const numMessages = messages.length;
    const meanLength =
      messages.reduce((acc, m) => acc + m.message.length, 0) / (numMessages || 1);

    res.json({
      numMessages,
      meanMessageLength: Number(meanLength.toFixed(2)),
      messages: messages.map((m) => ({
        name: m.name,
        contact: m.contact,
        message: m.message,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


const frontendBuildPath = path.resolve(__dirname, "frontend/build");
app.use(express.static(frontendBuildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});


// --- Запуск сервера ---
// Инициализация сервера
async function init() {
  try {
    await ContactMessage.sync({ alter: true }); // создаём таблицу, если нет
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Error initializing server:", err);
  }
}

init();