import { Request, Response } from 'express';
import { connectedUsers, io } from '..';
import Booking from '../models/Booking';

export default class BookingController{
    async store(req: Request, res: Response) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        //await booking.populate('spot').populate('user').execPopulate();

        await (await booking.populate('spot'))
        await (await booking.populate('user'))
        
        const ownerSocket = connectedUsers[booking.spot.user];        

        if (ownerSocket) {
            console.log("enviadooooo....");
            
            io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
}