const { StatusCodes } = require("http-status-codes");
const {BookingService}=require("../services/index");
const {createChannel,publishMessage}=require("../utils/messageQueue");
const {REMINDER_BINDING_KEY}=require("../config/serverConfig");

const bookingService=new BookingService();

class BookingController{

    async sendMessageToQueue(req,res){
        const channel=await createChannel();
        const payload={
            data:{
                subject:"This is a new noti",
                content:"Some queue will subscribe this",
                recepientEmail:"abhi.2040.dev@gmail.com",
                notificationTime:"2024-02-20T08:50:00.000"
            },
            service:"CREATE_TICKET"
        };
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Successfully published the event"
        });
    }

    async create(req,res){
        try {
            const response=await bookingService.createBooking(req.body);
            console.log(response);
            return res.status(StatusCodes.OK).json({
                success:true,
                message:"Successfully created a booking",
                data:response,
                err:{}
            });
        } catch (error) {
            return res.status(error.statusCode).json({
                message:error.message,
                success:false,
                err:error.explanation,
                data:{}
            });
        }
    }
    
}

module.exports=BookingController;