import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://abhi:Abhi123@backend-cohort.wxwmr.mongodb.net/userApp`)
        console.log(`mongoDB connected Successfully !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`mongoDB connection Failed !! ${error}`);
        process.exit(1)
    }
}

export { connectDB }