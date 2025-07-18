
import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
    if (isConnected) {
        console.log("🟢 MongoDB already connected.");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "DCX",
        });

        isConnected = true;
        console.log("✅ MongoDB connected to", conn.connection.host);
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        throw error;
    }
};

export default connectToDB;