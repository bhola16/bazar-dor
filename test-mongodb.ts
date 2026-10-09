import { loadEnvConfig } from "@next/env";
import { MongoClient } from "mongodb";

loadEnvConfig(process.cwd());

const uri = process.env.MONGODB_URL;

if (!uri) {
  console.error("MONGODB_URL is missing");
  process.exit(1);
}

console.log("MongoDB URI found");

const client = new MongoClient(uri);

const testConnection = async (): Promise<void> => {
  try {
    console.log("Connecting to MongoDB...");

    await client.connect();

    console.log("Connected successfully!");

    const result = await client.db("bangla-news-24").command({
      ping: 1,
    });

    console.log("Ping successful:", result);
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
};

testConnection();
