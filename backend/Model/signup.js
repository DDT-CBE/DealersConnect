import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    password:String,
    type:String
});

const SignupModel=mongoose.model("signup",signupSchema);


export default SignupModel;