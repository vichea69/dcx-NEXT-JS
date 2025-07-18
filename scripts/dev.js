// scripts/dev.js
import 'dotenv/config';
import connectToDB from '../service/mongo.js';
import { spawn } from 'child_process';

(async () => {
    const next = spawn('next', ['dev', '--turbopack'], {
        stdio: 'inherit', // pipes Next.js logs directly to your terminal
        shell: true,
    });

    // Wait for Next.js to boot up before logging DB connection
    setTimeout(async () => {
        try {
            await connectToDB();
            console.log(`\n✅ MongoDB connected to ${process.env.MONGODB_URL}`);
        } catch (err) {
            console.error('\n❌ MongoDB connection failed:', err.message);
        }
    }, 2000); // You can tweak the delay if needed
})();