const mongoose = require('mongoose')

const Schema = mongoose.Schema

const houseSchema = new Schema({
    place:{
        type: String,
        required: true
    },
    area:{
        type: Number,
        required: true
    },
    noOfBedrooms:{
        type: Number,
        required: true
    },
    noOfBathrooms:{
        type: Number,
        required: true
    },
    nearby:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        required: true,
        default: 0
    }
},{timestamps: true})

module.exports = mongoose.model('House', houseSchema)