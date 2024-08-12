const { Socket } = require("socket.io");
const authorizeUser = (socket, next) => {
    if(!socket.request.session || !socket.request.session.userSession){
        console.log("Bad request!");
        return next(new Error("Not authorized"));
    }else{
        socket.user = {...socket.request.session.userSession}
        next();
    }
}

module.exports = {authorizeUser};