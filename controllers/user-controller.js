const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError , UnauthenticatedError} = require('../errors/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    
        //  const {name , email, password} = req.body;
        //  const salt = await bcrypt.genSalt(10);
        //  const hashedPaswword = await bcrypt.hash(password,salt);
        //  const tempUser = {name, email, password:hashedPaswword }
        // console.log('email:',email);
        // console.log('name:',name);
        // console.log('password:',password);
        // if(!name || !email || !password){
            
        //     throw new BadRequestError('please enter name, email and password');
        // }
        const user = await User.create({...req.body});
        const token = user.createJWT();
        return res.status(StatusCodes.CREATED).json({user : {name: user.name}, token});
   
    
}

const login = async (req, res) => {
    const {email, password} = req.body;
   
    if(!email || !password){
        throw new BadRequestError('please provide email and password');
    }
    const user = await User.findOne({email:email});
    const isPasswordCorrect = await user.comparePassword(password);
    if(!user || !isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials');
    }
    
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name},token});

}


module.exports = {
    register,
    login
}