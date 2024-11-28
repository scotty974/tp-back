import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const con = await mongoose.connect("mongodb://localhost:27017/tp");
        console.log("Connected to MongoDB at " + con.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;