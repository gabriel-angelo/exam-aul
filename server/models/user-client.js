const mongoose = require("mongoose")

,	User =  new mongoose.Schema({
        name: { type: String, required : false},
        lastname: { type: String, required : false},
        firstname: { type: String, required : false},
        contact: { type: String, required : false},
        address: { type: String, required : false},
        isMember: { type: String, required : false, defalt: undefined},
    })

let users = mongoose.model('userclients',User);

exports.createUser = async (userData) => {
    console.log(userData)
    const newUser = new users(userData);
    try {
        return await newUser.save();
    } catch (error) {
        console.log(error);
    }
}

exports.findUser = async (userData) => {
    try {
        return await users.findOne(userData);
    } catch (error) {
        console.log(error);
    }
}

exports.getUserAll = async () => {
    try {
        return await users.find();
    } catch (error) {
        console.log(error);
    }
}

exports.usersNoMe = async (userData) => {
    try {
        return await users.find({_id:{$ne:userData}});
    } catch (error) {
        console.log(error);
    }
}
