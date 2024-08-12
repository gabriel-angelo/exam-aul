const mongoose = require("mongoose")

,	Holder =  new mongoose.Schema({
        orderNumber: { type: String, required : true},
        context: { type: String, required : true},
        create_at:{type : Date, require : true, default: new Date()},
        create_start:{type : Date, require : true},
        create_stop:{type : Date, require : true},
        trace:[{
            leader: {type: String, require : false, default:undefined},
            junior: {type: String, require : false, default:undefined},
            date_assign: {type: Date, require : false, default:new Date()},
            status: {type: String, require : false, default:undefined},
        }]
    })

let holders = mongoose.model('holder',Holder);

exports.assignHolder = async (holderData) => {
    const newHolder = new holders(holderData);
    try {
        return await newHoder.save();
    } catch (error) {
        console.log(error);
    }
}

exports.findHolderAll = async () => {
    try {
        return await users.find();
    } catch (error) {
        console.log(error);
    }
}

exports.createHolder = async (holderData) => {
    const newHolder = new holders(holderData);
    try {
        return await newHoder.save();
    } catch (error) {
        console.log(error);
    }
}
