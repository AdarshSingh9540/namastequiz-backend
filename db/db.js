const mongoose = require('mongoose');
const express =  require('express');

mongoose.connect("mongodb+srv://Adarsh:singh9540@cluster0.yju1yru.mongodb.net/QuizApp");

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String
});

const User = mongoose.model('User',userSchema)

module.exports ={
    User
}