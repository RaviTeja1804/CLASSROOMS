import tokenService from "../services/tokenService.js";
import teacherDetails from "../models/teacherModel.js";
import teacherModel from "../models/teacherModel.js";

class authoController{
    async registerHandler(req, res) {
        let existingTeacher = await teacherDetails.findOne({email:req.body.email});
        if(existingTeacher)
        {
            return res.status(400).json({success:false, errors:"Existing user found with same email"})
        }
        const newTeacher = new teacherModel({
            fullName:req.body.fullName,
            gender:req.body.gender,
            contact:req.body.contact,
            email:req.body.email,
            password:req.body.password,
            allBookings:[]
        })
        const ToSaveNewTeacher = await newTeacher.save();
        const token = tokenService.generateToken({email:req.body.email});
        console.log(token)
        res.json({success:true, token})
    }

    async loginHandler(req, res) {
        let existingTeacher = await teacherDetails.findOne({email:req.body.email});
        if(existingTeacher)
        {
            const passCheck = req.body.password === existingTeacher.password
            if(passCheck)
            {
                const token = tokenService.generateToken({email:req.body.email});
                return res.json({success:true, token, teacher: existingTeacher})
            }
            else
            {
                return res.json({success:false, errors:"Wrong password"})
            }
        }
        else
        {
            return res.json({success:false, errors:"No existing user with this Email Id"})
        }
    }

}

export default new authoController();
