const {CityRepository}=require("../repository/index");

class CityService{
    constructor(){
        this.cityRepository=new CityRepository();
    }

    //create city
    async createCity(data){
        try {
            const city=await this.cityRepository.createCity(data);
            return city;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw {error};
        }
    }

    //delete city
    async deleteCity(cityId){
        try {
            const response=await this.cityRepository.deleteCity(cityId);
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw {error};
        }

    }

    //update city
    async updateCity(cityId,data){
        try {
            const city=await this.cityRepository.updateCity(cityId,data);
            return city;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw {error};
        }

    }

    //get city
    async getCity(cityId){
        try {
            const city=await this.cityRepository.getCity(cityId);
            return city;   
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw {error};
        }
    }

    async getAllCities(filter){
        try {
            const cities=await this.cityRepository.getAllCities({name:filter.name});
            return cities;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw {error};
        }
    }
}


module.exports=CityService;