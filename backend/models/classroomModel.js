import mongoose,{Schema} from "mongoose";

const classroomModel = new mongoose.Schema({
    name:{type:String},
    location:{type:String},
    capacity:{type:Number},
    equipment:[{ type: String }] 
})

export default mongoose.model("Classrooms",classroomModel);