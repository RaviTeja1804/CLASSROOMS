import mongoose,{Schema} from "mongoose";

const bookingModel = new mongoose.Schema({
    date:{type:Date},
    start_time:{type:String},
    end_time:{type:String},
    classroom:{type:String},
    purpose:{type:String},
    name:{type:String},
    contact:{type:String},
    requirement:{type:String}
})

const teacherModel = new mongoose.Schema({
    fullName:{type:String},
    gender:{type:String},
    contact:{type:String},
    email:{type:String},
    password:{type:String},
    allBookings: [bookingModel]
})

export default mongoose.model("Teachers",teacherModel); 
