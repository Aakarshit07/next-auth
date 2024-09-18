import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Provide a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please Provide a email'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Please Provide a password'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String, // how it works is that it is a token that is sent to the user's email and db.  
    verifyTokenExpiry: Date
})


// due to next runs on edge computing
// many time it happens that next can't identify that its making the connection to db for first time or it is already connected.
// to handle both cases we do follow below line of code for creating Model.

// if already connected then we just passing the refrence of the model
// mongoose.model.users

// if connecting for the first time then we create a new model
// mongoose.model('users', userSchema)

const User = mongoose.model.users || mongoose.model('users', userSchema);

export default User;