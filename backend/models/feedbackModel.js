import mongoose,{Schema} from "mongoose";

const feedbackModel = new mongoose.Schema({
    rating:{type:String},
    message:{type:String},
    email:{type:String}
})

export default mongoose.model("feedbacks",feedbackModel);



