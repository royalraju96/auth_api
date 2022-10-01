import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) => {
    try {
        const DB_OPTION = {
            dbname : "thekedarDb"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTION)
        console.log("Connected Successfully...")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb