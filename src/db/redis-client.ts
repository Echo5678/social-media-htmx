import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
  socket: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

client.on("error", (err: any) =>
  console.error("Error connecting to Redis Client", err)
);

await client.connect();

export default client;
