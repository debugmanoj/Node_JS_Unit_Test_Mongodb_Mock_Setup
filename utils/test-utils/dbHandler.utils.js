import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

export const dbConnect = async () => {
    mongoServer = await MongoMemoryServer.create(); // Create a new instance
    const uri = mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await mongoose.connect(uri, mongooseOpts);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error; // Re-throw to handle it in the calling function if needed
    }
};

export const dbDisconnect = async () => {
    try {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        if (mongoServer) {
            await mongoServer.stop();
        }
        console.log("Database disconnected successfully!");
    } catch (error) {
        console.error("Error during database disconnection:", error);
        throw error;
    }
};
