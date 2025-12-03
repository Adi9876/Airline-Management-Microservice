const BookingRepository=require("../repository/booking-repository");
const axios=require("axios");
const {FLIGHT_SERVICE_PATH}=require("../config/serverConfig");
const { ServiceError } = require("../utils/errors/index");

class BookingService{
    constructor(){
        this.bookingRepository=new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId=data.flightId;
            const getFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight=await axios.get(getFlightRequestURL);
            const flightData=flight.data.data;
            let priceOfTheFlight=flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process','Insufficient Seats');
            }

            let totalPrice=priceOfTheFlight*(data.noOfSeats);
            const bookingPayload={
                ...data,totalPrice
            };

            const booking =await this.bookingRepository.create(bookingPayload); 
            console.log(booking);

            const updateFlightRequestURL= `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;

            await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeats-booking.noOfSeats});

            const finalBooking=await this.bookingRepository.update(booking.id,{status:"Booked"});

            return finalBooking;

        } catch (error) {
            console.log(error);
            if(error.name=='RepositoryError' || error.name=="ValidationError"){
                throw error;
            }

            throw new ServiceError('Booking Failed','Not able to create a booking');
        }
    }
}

module.exports=BookingService;

