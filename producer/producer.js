import express from "express";
import { createClient } from "redis";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Generate a unique ID for this producer instance
const producerId = uuidv4();

// Redis client
const redisClient = createClient({url: "redis://redis:6379"});
redisClient.connect().catch(console.error);

// POST endpoint to receive notifications
app.post("/notifications", async (req, res) => {
    const notification = { ...req.body, timestamp: new Date() };

    // Type must exist
    if (!notification.Type) {
        return res.status(400).json({ error: "Type is required" });
    }

    let status = "Pending"; // placeholder

    // Dictionary for notification types, add new Types here, no more actions required.
    const notificationMap = {
        Warning: true,   // should be queued
        Info: false      // should be ignored
        // Add more types here if needed
    };

    // Determine action based on type
    if (notificationMap[notification.Type]) {
        // Dynmically assign Queue based on type of notification.
        const queueName = `${notification.Type}Queue`;
        await redisClient.rPush(queueName, JSON.stringify(notification));
        console.log("Notification queued:", notification);
        status = "Queued";
    } else {
        console.log(`${notification.Type || "Unknown"} notification ignored:`, notification);
        status = "Ignored";
    }

    res.status(200).json({ 
        status: status, 
        producer: producerId 
    });
    
});

// Start the server
app.listen(PORT, () => console.log(`Producer running on port http://localhost:${PORT}, ID: ${producerId}`));