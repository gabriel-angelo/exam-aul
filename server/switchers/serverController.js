const express = require("express")
const session = require("express-session");
const { Socket } = require("socket.io");
const { v4: uuidV4 } = require('uuid');
const MAX_AGE = 1000 * 60 * 60 * 24 * 3
,// 	mongoURL = "mongodb+srv://gabrielangelo:glvQnXxxGCUPkGe3@ngmap.zov1qs0.mongodb.net/ngmapdb"
      mongoURL = "mongodb+srv://imanikalumuna:PDEqbDA6qlTGrLJH@bumal.ynq5h5n.mongodb.net/bumall-db"
const {
	PORT = process.env.PORT || 5004,
	NODE_ENV = 'development',
	SESS_NAME = 'session-ngmap',
	SESS_SECRET = uuidV4(),
	SESS_LIFETIME = MAX_AGE,
    IN_PROD = NODE_ENV === "production",
} = process.env;

const sessionMiddleware = session({
    name : SESS_NAME ,
    resave : false,
    saveUninitialized : true,
    secret : SESS_SECRET,
    cookie :{
        maxAge : SESS_LIFETIME,
        sameSite : true,
        secure : IN_PROD
    }
})

const initializeSession = (req, res, next) => {
	res.locals.userSession = req.session.user;
	next();
}

const corsConfig = {origin : 'http://localhost:5004', credentials : "true",}

const wrap = (expressMiddleware) => (socket, next) => expressMiddleware(socket.request, {}, next)
 
module.exports = {sessionMiddleware,initializeSession, PORT, mongoURL, wrap, corsConfig };