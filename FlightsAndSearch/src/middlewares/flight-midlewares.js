const {ClientErrorCodes}=require("../utils/error-codes");

const validateCreateFlight=(req,res,next)=>{
    if(!req.body.flightNumber || 
        !req.body.airplaneId || 
        !req.body.arrivalAirportId || 
        !req.body.departureAirportId || 
        !req.body.arrivalTime || 
        !req.body.departureTime || 
        !req.body.price)
        {
            return res.status(ClientErrorCodes.BAD_REQUEST).json({
                data:{},
                success:false,
                message:"Invalid request body to create a flight",
                err:"Missing mandatory properties to create a flight"
            });
        }

        next();
        
}

module.exports={
    validateCreateFlight
}