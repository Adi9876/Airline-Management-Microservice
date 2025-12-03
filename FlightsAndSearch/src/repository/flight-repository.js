const { Flights } = require("../models/index");
const {Op}=require("sequelize");

class FlightRepository {

    #createFilter(data){
        let filter={};
        if(data.arrivalAirportId){
            filter.arrivalAirportId=data.arrivalAirportId;
        }
        if(data.departureAirportId){
            filter.departureAirportId=data.departureAirportId;
        }
        let priceFilter=[];
        if(data.minPrice){
            priceFilter.push({price:{[Op.gte]:data.minPrice}});
        }

        if(data.maxPrice){
            priceFilter.push({price:{[Op.lte]:data.maxPrice}});
        }

        Object.assign(filter,{[Op.and]:priceFilter});
        return filter;
    }

    async createFlight(data) {
        try {
            const flight = await Flights.create(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await Flights.findOne({
                where: {
                    id: flightId
                }
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }

    }

    async getAllFlights(filter) {
        try {
            const filterObject=this.#createFilter(filter); 
            const flights=await Flights.findAll({
                where:filterObject
            });
            return flights;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }

    }
        
    async updateFlight(flightId,data){
        try {
            await Flights.update(data,{
                where:{
                    id:flightId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

}

module.exports = FlightRepository;