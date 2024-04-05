import { Router } from "express";
import teacherController, { fetchTeacher } from "../controllers/teacherController.js";

const router=Router();

router.get("/getTeacherByfullName/:name",teacherController.getTeacherByfullName);
router.get("/getTeacherByemail/:email",teacherController.getTeacherByemail);
router.get("/getTeachers",teacherController.getTeachers)
router.post("/addBooking",fetchTeacher,teacherController.addBooking);
router.post("/removeteacher",teacherController.removeteacher);


export default router;