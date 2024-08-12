const mongoose = require("mongoose")

,	User =  new mongoose.Schema({
        login: { type: String, required : true},
        password: { type: String, required : true},
    })

let users = mongoose.model('users',User);

exports.createUser = async (userData) => {
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
        return await users.find({},{"account.password":0});
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
