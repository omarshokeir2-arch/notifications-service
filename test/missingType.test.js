// test/missingType.test.js
// Purpose: Send a notification without a type, error 400 should be returned.

const fetch = require("node-fetch");

const url = "http://localhost:3000/notifications";

test("POST without type", async () => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ invalid: "data" }),
  });
  expect(res.status).toBe(400);
});
