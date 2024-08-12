const mongoose = require("mongoose")

,	User =  new mongoose.Schema({
        login: { type: String, required : true},
        password: { type: String, required : true}
    })

let users = mongoose.model('useradmin',User);

exports.createUser = async () => {
    const newUser = new users();
    try {
        return await newUser.save();
    } catch (error) {
        console.log(error);
    }
}

exports.findUser = async () => {
    try {
        return await users.find();
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
