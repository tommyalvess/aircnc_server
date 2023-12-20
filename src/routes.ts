import express from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import ApprovalController from './controllers/ApprovalController';
import BookingController from './controllers/BookingController';
import DashboardController from './controllers/DashboardController';
import RejectionController from './controllers/RejectionController';
import SessionController from './controllers/SessionController';
import SpotController from './controllers/SpotController';


const routes = express.Router()
const upload = multer(uploadConfig)

const sessionController = new SessionController()
const spotController =  new SpotController()
const dashboardController =  new DashboardController()
const bookingController = new BookingController()
const approvalController =  new ApprovalController()
const rejectionController =  new RejectionController()


routes.post('/sessions', sessionController.store);

routes.get('/spots', spotController.index);
routes.post('/spots', upload.single('thumbnail'), spotController.store);

routes.get('/dashboard', dashboardController.show);

routes.post('/spots/:spot_id/bookings', bookingController.store);

routes.post('/bookings/:booking_id/approvals', approvalController.store);
routes.post('/bookings/:booking_id/rejections', rejectionController.store);

export default routes;