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
        
        const holidays = [
            {name: "Republic Day", date: "2024-01-26"},
            {name: "Holi", date: "2024-03-25"},
            {name: "Good Friday", date: "2024-03-29"},
            {name: "Id-ul-Fitr", date: "2024-04-11"},
            {name: "Ram Navmi", date: "2024-04-17"},
            {name: "Mahavir Jayanti", date: "2024-04-21"},
            {name: "Buddha Purnima", date: "2024-05-23"},
            {name: "Id-ul-Zuha (Bakrid)", date: "2024-06-17"},
            {name: "Muharram", date: "2024-07-17"},
            {name: "Independence Day / Parsi New Year’s Day / Nauraj", date: "2024-08-15"},
            {name: "Janamashtami (Vaishnva)", date: "2024-08-26"},
            {name: "Milad-un-Nabi or Id-e-Milad (Birthday of Prophet Mohammad)", date: "2024-09-16"},
            {name: "Mahatma Gandhi’s Birthday", date: "2024-10-02"},
            {name: "Dussehra", date: "2024-10-12"},
            {name: "Diwali", date: "2024-10-31"},
            {name: "Christmas", date: "2024-12-25"}
        ];        
        
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

        const isHoliday = holidays.some(holiday => holiday.date === req.body.date.substring(0,10));
        if (isHoliday) {
            console.log("Booking date falls on a holiday");
            return res.json({ message: "Booking date falls on a holiday. Please choose another date." });
        }

        if(req.body.start_time > req.body.end_time)
        {
            console.log("Start time cannot be greater than End time")
            return res.json({ message: "Start time cannot be greater than End time"})
        }

        const existingBookings = await bookingModel.find({
            classroom: newBookingForTeacher.classroom,
            date: newBookingForTeacher.date,
            $or: [
                { start_time: { $lt: newBookingForTeacher.end_time }, end_time: { $gt: newBookingForTeacher.start_time } },
                { start_time: { $gte: newBookingForTeacher.start_time, $lte: newBookingForTeacher.end_time } }
            ]
        });

        const existingRooms = await classroomModel.find({name:newBookingForTeacher.classroom})

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
        return res.json({message: "Added successfully"});
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