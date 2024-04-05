import classroomModel from "../models/classroomModel.js";
import classroomDetails from "../models/classroomModel.js";

class classroomController{
    async getClassrooms(req, res){
        const allClassrooms = await classroomDetails.find({});
        res.json(allClassrooms);
    }

    async getClassroomByname(req, res){
        const classroom = await classroomDetails.findOne({name: req.params.name});
        if(!classroom)
        {
            return res.status(404).json({ message: "Classroom not found" });
        }
        res.json(classroom);
    }

    async removeclassroom(req, res) {
        const classroom = await classroomDetails.findOne({name: req.body.name});
        if(!classroom)
        {
            return res.status(404).json({ message: "Classroom not found" });
        }
        if(classroom.location !== req.body.location)
        {
            return res.status(404).json({ message: "Location not matching with classroom you mentioned" });
        }
        await classroomDetails.findOneAndDelete({name: req.body.name})
        return res.json({ message: "Successfully deleted" });
    }

    async addClassroom(req, res) {
        const classroom = await classroomDetails.findOne({name: req.body.name});
        if(classroom)
        {
            return res.status(404).json({ message: "Classroom already exists"});
        }
        const newClassroom = new classroomModel({
            name:req.body.name,
            location:req.body.location,
            capacity:req.body.capacity,
            equipment:req.body.equipment
        })
        await newClassroom.save();
        return res.json({ message: "Added successfully" });
    }
}

export default new classroomController();