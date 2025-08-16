// test/warningQueueCount.test.js
// Purpose: POST 10 messages, ensure that only warnings are queued.

const fetch = require("node-fetch");

const url = "http://localhost:3000/notifications";

async function sendNotification(type, id) {
  const body = {
    Type: type,
    Name: `${type} Notification ${id}`,
    Description: `[mixedNotifications] This is a ${type} notification ${id}`,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  return { type, response: json };
}

test("only Warning notifications are queued", async () => {
  const types = ["Info", "Warning"];
  const notifications = [];

  // Send 10 mixed notifications, counting how many are Warning
  let warningCount = 0;
  for (let i = 1; i <= 10; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    if (type === "Warning") warningCount++;
    notifications.push(sendNotification(type, i));
  }

  const results = await Promise.all(notifications);

  // Count how many responses were actually queued
  const queuedCount = results.filter(r => r.response.status === "Queued").length;

  console.log(`Warnings sent: ${warningCount}, Queued: ${queuedCount}`);
  expect(queuedCount).toBe(warningCount);
});
