
import mongoose from "mongoose";

// Reuse a global cached connection across hot reloads in development and route invocations
// This prevents "MongoDB already connected" logs and multiple connections
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectToDB = async () => {
    if (cached.conn && mongoose.connection.readyState === 1) {
        return cached.conn;
    }

    if (!cached.promise) {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) throw new Error("MONGODB_URL env var is not set");

        const options = { dbName: process.env.MONGODB_DB || "DCX", bufferCommands: false };

        cached.promise = mongoose.connect(mongoUrl, options).then((mongooseInstance) => {
            if (!global.__MONGO_CONNECTED_LOGGED__) {
                console.log("✅ MongoDB connected to", mongooseInstance.connection.host);
                global.__MONGO_CONNECTED_LOGGED__ = true;
            }
            return mongooseInstance;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default connectToDB;