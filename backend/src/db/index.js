import mongoose from "mongoose";

export const dbConnect=async()=>{
    try {
        const connectionInstance=await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDb connection successfully ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`mongoDb failed to connect ${error.message}`);
        process.exit(1);
    }
}