const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');
const register = async (req, res) => {
    
        const {name , email, password} = req.body;
        console.log('email:',email);
        console.log('name:',name);
        console.log('password:',password);
        if(!name || !email || !password){
            
            throw new BadRequestError('please enter name, email and password');
        }
        const user = await User.create(req.body);
        return res.status(StatusCodes.CREATED).json({user});
   
    
}

const login = async (req, res) => {
    res.send('Into login!');
}


module.exports = {
    register,
    login
}