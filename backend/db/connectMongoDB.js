import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
       
        const con=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongo db is connected :${con.connection.host}`)
        
    } catch (error) {
        console.log(`in mogodb connection error ${error}`)
        process.exit(1)
    }
}
export default connectMongoDB


