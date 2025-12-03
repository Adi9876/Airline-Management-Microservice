const express=require("express");
const bodyParser=require("body-parser");
const {PORT, REMINDER_BINDING_KEY}=require("./config/serverConfig");
const TicketController=require("./controllers/ticket-controller");
const {setUpJobs}=require("./utils/job");

const {createChannel}=require("./utils/messageQueue");
const {subscribeMessage}=require("./utils/messageQueue");
const emailService=require("./services/email-service");


const setUpAndStartServer=async()=>{
    const app=express(); 

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets',TicketController.create);

    const channel=await createChannel(); 
    subscribeMessage(channel,emailService.subscribeEvents,REMINDER_BINDING_KEY);

    app.listen(PORT,()=>{
        console.log(`Server started on PORT ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    });
}


setUpAndStartServer();