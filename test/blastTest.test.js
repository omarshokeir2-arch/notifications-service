// test/blastTest.test.js
// Purpose: Test to make sure all 100 notifications are processed successfully.
// Extra: Check consumer logs manually to ensure load distribution.

const fetch = require("node-fetch");

const url = "http://localhost:3000/notifications";

async function sendNotification(id) {
  const body = {
    Type: "Warning",
    Name: `Backup Failure ${id}`,
    Description: `[blastTest] - ${id}`,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.status;
}

test("sent 10 notifications successfully", async () => {
  let successful = 0;

  for (let i = 1; i <= 10; i++) {
    const status = await sendNotification(i);
    if (status === 200) successful++;
  }

  console.log("Check consumers containers logs to ensure load balancing have been achieved");
  expect(successful).toBe(10);
});
