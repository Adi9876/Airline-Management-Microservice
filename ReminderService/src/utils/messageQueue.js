const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL,EXCHANGE_NAME}=require("../config/serverConfig");

const createChannel = async () => {
    try {

        // set up connection to rabbit mq server
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);

        // created a channels
        const channel = await connection.createChannel();

        // set up exchange distributor -- helps to decide to which queue messages should be sent, based on binding_key.
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);

        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage=async(channel,service,binding_key)=>{
    const applicationQueue=await channel.assertQueue('QUEUE_NAME');
    channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,binding_key);

    channel.consume(applicationQueue.queue, msg=>{
        console.log('received data');
        console.log(msg.content.toString());
        const payload=JSON.parse(msg.content.toString());
        service(payload);
        channel.ack(msg);
    });

}


const publishMessage=async(channel,binding_key,message)=>{
    try {
        await channel.assertQueue(QUEUE_NAME);
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports={  
    subscribeMessage,
    createChannel,
    publishMessage
}