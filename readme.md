# Producer-Consumer Pattern

Similar to AWS SQS:
![SQS Diagram](https://miro.medium.com/v2/resize\:fit:720/format\:webp/1*rf8DwGuhXHrwhGhUnFNmxA.png)

This project demonstrates a **Producer-Consumer pattern** with Redis:

* **Multiple consumers** for load balancing and stress tolerance

---

## Getting Started

### Without Docker

1. Install dependencies:

```bash
npm install
```

2. Start Redis:

```bash
docker run --name redis -p 6379:6379 -d redis
```

3. Start the producer:

```bash
cd producer
node producer.js
```

4. Start one or more consumers:

```bash
cd consumer
node consumer.js
```

---

### With Docker

1. Build containers:

```bash
docker-compose build
```

2. Start services:

```bash
docker-compose up
```

3. Optional: scale consumers

```bash
docker-compose up --scale consumer=2
```
---

## Testing

### Using Jest

```bash
npm install jest
npm test
```

### Using `curl` (Windows Command Line), for heavy workload testing

```bash
curl -X POST http://localhost:3000/notifications -H "Content-Type: application/json" -d "{\"Type\":\"Warning\",\"isHeavy\":\"True\"}"
```

### Using `curl` (Windows Command Line), to crash consumers for recovery testing

```bash
curl -X POST http://localhost:3000/notifications -H "Content-Type: application/json" -d "{\"Type\":\"Warning\",\"isCrashing\":\"True\"}"
```


---

## References

* [System Design Patterns: Producer-Consumer Pattern](https://dsysd-dev.medium.com/system-design-patterns-producer-consumer-pattern-1572f813329b)
* [AWS SQS – What, Why, When](https://aws.plainenglish.io/aws-sqs-what-why-when-176e6027e5cc)
