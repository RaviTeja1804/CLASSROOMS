import feedbackModel from "../models/feedbackModel.js";

class feedbackController{
    async addFeedback(req, res){
        const newFeedback = new feedbackModel({
            rating:req.body.rating,
            message:req.body.message,
            email:req.body.email
        })
        await newFeedback.save();
        return res.json({ message: "Added successfully" });
    }

    async allfeedbacks(req, res){
        const allFeedbacks = await feedbackModel.find({});
        res.json(allFeedbacks);
    }

}

export default new feedbackController();
