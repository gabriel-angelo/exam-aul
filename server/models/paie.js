const mongoose = require("mongoose")

,	Paie =  new mongoose.Schema({
        user: { type: String, required : true},
        create_at: { type: Date, required : true, default: Date.now},
        amount: { type: String, required : true},
        matric: { type: String, required : true, default:`UAL-${Math.random().toString(7,7).substr(2,5)}-${(0|new Date%9e6).toString(36)}`.toLocaleUpperCase()}
    })

let paies = mongoose.model('paies',Paie);

exports.createPaie = async (paieData) => {
    const newPaie = new paies(paieData);
    try {
        return await newPaie.save();
    } catch (error) {
        console.log(error);
    }
}

exports.findPaie = async (paieData) => {
    try {
        return await paies.findOne(paieData);
    } catch (error) {
        console.log(error);
    }
}

exports.getPaieAll = async () => {
    try {
        return await paies.find({},{"account.password":0});
    } catch (error) {
        console.log(error);
    }
}

exports.paiesNoMe = async (paieData) => {
    try {
        return await paies.find({_id:{$ne:paieData}});
    } catch (error) {
        console.log(error);
    }
}
