const User = require('../models/userModel')
const House = require("../models/houseModel");
const validator = require('validator')

const signupUser = async function(req, res) {
    const {firstName,lastName,phone,userType,email,password} = req.body

    try{
        if(!firstName || !lastName || !userType) {
            throw Error('All fields must be filled')
        }
    
        if(!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }
    
        if(!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough')
        }

        if(userType!= 'Buyer' && userType!='Seller') {
            throw Error('Invalid User Type')
        }
        const exists = await User.findOne({email})

        if(exists){
            throw Error('Email already in use')
        }
        const user = await User.create({firstName,lastName,phone,userType,email,password})
        
        res.status(200).json(user)
        return user
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const loginUser = async function(req, res) {
    const {email,password} = req.body

    try{
        if(!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }
    
        if(!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough')
        }

        const user = await User.findOne({email})

        if(!user){
            throw Error('Email not found')
        }

        if(password !== user.password){
            throw Error('Incorrect password')
        }

        res.status(200).json(user)
        return user
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const getUser = async function(req, res) {
    const house_id = req.headers['houseid']

    try {
        const house = await House.findOne({_id:house_id})

        const uid = house.user_id
        const seller = await User.findOne({_id:uid})

        res.status(200).json(seller)
    } catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports = {signupUser, loginUser,getUser}