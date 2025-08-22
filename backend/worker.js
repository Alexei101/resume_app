const ContactMessage = require("./models/ContactMessage");

const queue = "contact_queue";

channel.consume(queue, async (msg) => {
  const data = JSON.parse(msg.content.toString());
  console.log("📩 Received:", data);

  const saved = await ContactMessage.create(data);
  console.log("✅ Saved to DB:", saved.toJSON());

  channel.ack(msg);
});