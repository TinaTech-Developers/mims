import mongoose, { Mongoose } from "mongoose";

// Ensure the environment variable is defined
const MONGODB_URI = process.env.MONGODB_URI;
if (typeof MONGODB_URI !== "string") {
  throw new Error("Missing MongoDB URI in environment variables.");
}

// Define cache interface
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend global NodeJS object
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize cache if it doesn’t exist
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!)
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
