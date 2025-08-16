import { v4 as uuidv4 } from 'uuid';
import { createClient } from "redis";

// Generate a unique ID for this consumer instance
const consumerId = uuidv4();

// Used to track number of consumed messages, to test load balancing
let current = 0;

// Connect to Redis
const redisClient = createClient({ url: "redis://redis:6379" });
redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();


console.log(`Consumer started with ID: ${consumerId}`);


async function consumeNotifications() {
    while (true) {
        // BLPOP blocks until an item is available
        const result = await redisClient.blPop("WarningQueue", 0); 
        if (result) {
            const notification = JSON.parse(result.element);
            current++;
            console.log(`Consumer ${consumerId} consumed notification #${current}:`, notification);
            // TODO: Implement actual consuming logic here

            // Simulate a heavy workload. Good to test Kubernetes ability to scale out.
            if (notification.isHeavy === "True") {
                console.log("Heavy workload detected. Starting 2-minute processing...");
                const totalMs = 2 * 60 * 1000; // 2 minutes
                const intervalMs = totalMs / 10; // 10% steps

                for (let i = 1; i <= 10; i++) {
                    await new Promise(r => setTimeout(r, intervalMs));
                    console.log(`Progress: ${i * 10}%`);
                }
                console.log("Heavy processing done");
            }

            // Simulate a pod crash. Good to test Kubernetes ability to recover crashed pods.
            if (notification.isCrashing === "True") {
                console.log("Crash simulated.");
                throw new Error("Simulated crash");
            }

        }
    }
}

consumeNotifications();