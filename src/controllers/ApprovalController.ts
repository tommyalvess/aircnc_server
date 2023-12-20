import { Request, Response } from 'express';
import { connectedUsers, io } from "..";
import Booking from "../models/Booking";

export default class ApprovalController {
    
    async store(req: Request, res: Response) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();

        const bookingUserSocket = connectedUsers[booking.user];

        if (bookingUserSocket) {
            io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.status(201).send(booking);
    }
    
}