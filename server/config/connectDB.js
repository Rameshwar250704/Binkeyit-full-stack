// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/Blinkit", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ Connected to local MongoDB");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1); // Stop server if DB fails
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB")
    } catch (error) {
        console.log("Mongodb connect error",error)
        process.exit(1)
    }
}

export default connectDB