import bookingDetails from "../models/bookingModel.js";

class bookingController{
    async getBookings(req, res){
        const allBookings = await bookingDetails.find({});
        res.json(allBookings);
    }

    async getBookingByname(req, res){
        const booking = await bookingDetails.findOne({name: req.params.name});
        if(!booking)
        {
            return res.status(404).json({ message: "No bookings" });
        }
        res.json(booking);
    }

}

export default new bookingController();
