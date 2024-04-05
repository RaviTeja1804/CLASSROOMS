import { Router } from "express";
import bookingController from "../controllers/bookingController.js";

const router = Router();

router.get("/getBookings",bookingController.getBookings);
router.get("/getBookings/:name",bookingController.getBookingByname);

export default router;