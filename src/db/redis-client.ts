import { createClient } from "redis";

//:(
const client = createClient({
  url: process.env.REDIS_URL,
  socket: {
    port: process.env.REDIS_PORT as number,
    host: process.env.REDIS_HOST,
  },
});

client.on("error", (err: any) =>
  console.error("Error connecting to Redis Client", err)
);

await client.connect();

export default client;
