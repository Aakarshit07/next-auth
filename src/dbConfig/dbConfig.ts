import mongoose  from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error, please make sure db is up and running', err);
            process.exit()
            // here are exit code as well
        })
    } catch (error) {
        console.log('Something went wrong in connection to DB')
        console.log(error);
    }
}