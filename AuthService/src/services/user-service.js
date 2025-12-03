const UserRepository=require("../repository/user-repository");
const jwt=require("jsonwebtoken");

const {JWT_KEY}=require("../config/serverConfig");
const bcrypt=require("bcrypt");
const AppErrors = require("../utils/error-handler");

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }

    async create(data){
        try {
           const user= await this.userRepository.create(data);
           return user;
        } catch (error) {
            if(error.name=="SequelizeValidationError"){
                throw error;
            }

            console.log("Something went wrong in the service layer");
            throw new AppErrors(
                'ServerError',
                'Something went wrong in the service',
                'Logical Issue Found',
                500
            )
        }
    }

    createToken(user){
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw {error};
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            const response=bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
            return response;
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw {error};
        }
    }

    async signIn(email,Password){
        try {
            const user=await this.userRepository.getByEmail(email);

            const passwordsMatch=this.checkPassword(Password,user.password);
            if(!passwordsMatch){
                console.log("Passwords does not match");
                throw {error:'Incorrect password'};
            }

            const newjwt=this.createToken({email:user.email,id:user.id});
            return newjwt;
            
        } catch (error) {
            console.log("Something went wrong in signIn");
            throw {error};
        }
    }

    async isAuthenticated(token){
        try {
            const response=this.verifyToken(token);
            if(!response){
                throw {error:"Invalid Token"};
            }
            const user=this.userRepository.getById(response.id);

            if(!user){
                throw {error:"No user with corresponding token exists"};
            }

            return user.id;
        } catch (error) {
            console.log("Something went wrong in auth process");
            throw {error};
        }
    }

    async isAdmin(userId){
        try {
            const response=await this.userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            console.log("Something went wrong in auth process");
            throw {error};
        }
    }
}

module.exports=UserService;