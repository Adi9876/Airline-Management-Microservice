const express=require("express");
const morgan=require("morgan");
const {rateLimit}=require("express-rate-limit");
const axios=require("axios");

const { createProxyMiddleware } = require('http-proxy-middleware');

const app=express();
app.use(morgan('combined'));

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, 
	limit: 5
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use('/bookingservice',async(req,res,next)=>{
    console.log(req.headers['x-access-token']);
    try {
        const response=await axios.get('http://localhost:3001/api/v1/isauthenticated',{
            headers:{
                'x-access-token':req.headers['x-access-token']
            }
        });
        if(response.data.success){
            next();
        }else{
            return res.status(401).json({
                message:"Unauthorised"
            });
        }
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorised"
        });
    }
});

app.get("/home",(req,res)=>{
    return res.json({message:"OK"});
});

app.use('/bookingService', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
const PORT=3005;

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
});