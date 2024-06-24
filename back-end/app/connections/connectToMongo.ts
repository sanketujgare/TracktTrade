import { connect } from "mongoose";

export const connectToMongoDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log("CONNECTED TO DB");
        return true;
    } catch (e) {
        throw "FAILED TO CONNECT";
    }
};
