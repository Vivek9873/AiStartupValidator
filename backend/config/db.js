import mongoose from "mongoose";

const ConnectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb Connected Successfully!");
    }
    catch (e) {
        console.log(`Database Connection Error Occured`)
    }
}

export default ConnectToDB;