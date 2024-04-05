import { Router } from "express";
import authController from "../controllers/authController.js";

const router=Router();

router.post("/register",authController.registerHandler);
router.post("/login",authController.loginHandler);

export default router;