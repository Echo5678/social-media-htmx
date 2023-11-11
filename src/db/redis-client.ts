import { createClient } from "redis";

//:(
const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err: any) =>
  console.error("Error connecting to Redis Client", err)
);

await client.connect();

export default client;
