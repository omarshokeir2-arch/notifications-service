// test/singleNotification.test.js
// Purpose: Test with a single notification, usually to ensure server is up.

const fetch = require("node-fetch");

const url = "http://localhost:3000/notifications";

test("send a single notification", async () => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Type: "Info",
      Name: "Test Notification",
      Description: "[singleNotification] This is a single test notification",
    }),
  });
  expect(res.status).toBe(200);
});
