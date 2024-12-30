import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema({
    auth_id:String,
    name:String,
    role:String,
    paid:Boolean,
    credits:Number,
    visibelNumbers:[String],
    dfs:[String]
});

const UserInfoModel=mongoose.model("user_info",UserInfoSchema);
export default UserInfoModel;
