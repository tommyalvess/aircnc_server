import mongoose from "mongoose";

const BookingSchema = mongoose.model('Booking', new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    spot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Spot'
    }
}
));

export default BookingSchema;