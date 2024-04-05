import { Router } from "express";
import classroomController from "../controllers/classroomController.js";

const router=Router();

router.get("/getClassrooms",classroomController.getClassrooms);
router.get("/getClassrooms/:name",classroomController.getClassroomByname);
router.post("/addclassroom",classroomController.addClassroom)
router.post("/removeclassroom",classroomController.removeclassroom)

export default router;