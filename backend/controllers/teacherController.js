import teacherDetails from "../models/teacherModel.js";
import jwt from "jsonwebtoken"
import bookingModel from "../models/bookingModel.js";
import classroomModel from "../models/classroomModel.js"

class teacherController{
    async getTeachers(req, res){
        const allTeachers = await teacherDetails.find({});
        console.log(allTeachers)
        res.json(allTeachers);
    }

    async getTeacherByfullName(req, res){
        const teacher = await teacherDetails.findOne({fullName: req.params.name});
        if(!teacher)
        {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.json(teacher);
    }

    async getTeacherByemail(req, res){
        const teacher = await teacherDetails.findOne({email: req.params.email});
        if(!teacher)
        {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.json(teacher);
    }

    async removeteacher(req, res) {
        const teacher = await teacherDetails.findOne({email: req.body.email});
        if(!teacher)
        {
            return res.status(404).json({ message: "Teacher not found" });
        }
        await teacherDetails.findOneAndDelete({email: req.body.email})
        res.message = "Successfully deleted"
        return res;
    }

    async addBooking(req, res) {        
        const newBooking = new bookingModel({
            date:req.body.date,
            start_time:req.body.start_time,
            end_time:req.body.end_time,
            classroom:req.body.classroom,
            purpose:req.body.purpose,
            name:req.body.name,
            contact:req.body.contact,
            requirement:req.body.requirement
        })

        const newBookingForTeacher = req.body;

        const existingBookings = await bookingModel.find({
            classroom: newBookingForTeacher.classroom,
            date: newBookingForTeacher.date,
            $or: [
                { start_time: { $lt: newBookingForTeacher.end_time }, end_time: { $gt: newBookingForTeacher.start_time } },
                { start_time: { $gte: newBookingForTeacher.start_time, $lte: newBookingForTeacher.end_time } }
            ]
        });

        const existingRooms = await classroomModel.find({name:newBookingForTeacher.classroom})

        if(newBookingForTeacher.start_time > newBookingForTeacher.end_time)
        {
            return res.json({ message: "Start time cannot be greater than End time"})
        }

        if(existingRooms.length==0)
        {
            console.log("There is no such classroom available")
            return res.json({ message: "There is no such classroom available"});
        }

        if(existingBookings.length > 0) 
        {
            console.log("There is a collision with existing bookings")
            return res.json({ message: "There is a collision with existing bookings"});
        }

        req.teacher.allBookings.push(newBookingForTeacher)
        await req.teacher.save();
        await newBooking.save();
        return res.json({ message: "Added successfully" });
    }
}


export const fetchTeacher =async (req, res, next)=>{
    const token = req.header('auth_token')
    console.log(token)
    if(!token)
    {
        res.status(401).send({errors: "Please authenticate using valid token"})
    }
    else
    {
        try {
            const teacherData = jwt.verify(token, 'auth_token')
            const teacher = await teacherDetails.findOne({email:teacherData.email});
            if (!teacher) {
                return res.status(404).json({ message: "Teacher not found" });
            }
            req.teacher = teacher;
            next()
        }
        catch(error) {
            return res.status(401).send({ errors: "Invalid token" });
        }
    }
}
export default new teacherController();