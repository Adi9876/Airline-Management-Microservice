const express=require("express");

const {BookingController}=require("../../controllers/index");

const router=express.Router();

// const {createChannel}=require("../../utils/messageQueue");

// const channel=createChannel();

const bookingController=new BookingController();

router.get('/test',function(req,res){
    return res.json({"test":true});
});

router.post('/bookings',bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue);

module.exports=router;