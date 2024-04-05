import { Router } from "express";
import feedbackController from "../controllers/feedbackController.js";

const router=Router();

router.post("/addFeedback",feedbackController.addFeedback);
router.get("/allFeedbacks",feedbackController.allfeedbacks)

export default router;