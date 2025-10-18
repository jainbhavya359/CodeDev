import mongoose from 'mongoose';

let isConnected = false;

export async function connect() {
  if (isConnected) return;

  //try make a seperate variable to check for issues with connnection
  const conn = await mongoose.connect(process.env.MONGO_URI!, {
    maxPoolSize: 10, // adjust for concurrency
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000, // fail fast if DB is unreachable
  });

  isConnected = !!conn.connections[0].readyState;
  console.log("MongoDB connected");
}
