const express = require("express")
,	session = require("express-session")
,	app = express()
,	fs = require('fs')
,	cors = require('cors')
,	https = require('https')
,	server = require('http').Server(app)
,	{ v4: uuidV4 } = require('uuid')
,	{ config } = require("process")
,	path = require("path")
,	mongoose = require("mongoose")
,   db = mongoose.connection
,	authentificatedUser = require("./server/routes/auth")
,	authAdmin = require("./server/routes/authAdmin")
,   {authorizeUser} = require('./server/switchers/socketIOController')
,	{sessionMiddleware, initializeSession, PORT, mongoURL, wrap, corsConfig} = require('./server/switchers/serverController')
,	io = require('socket.io')(server, { cors : corsConfig})

app.use(cors({origin:corsConfig}))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}))
app.use(sessionMiddleware);
app.use(initializeSession);

mongoose.set('strictQuery', true)
mongoose.connect(mongoURL);
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connect to Database bumal-app"))

app.use("/", authentificatedUser)
app.use("/admin", authAdmin)

io.use(wrap(sessionMiddleware))
io.use(authorizeUser);

io.on('connection', socket => {
	console.log("socket session connected");
	socket.on("ngmap-user-position-get", (geopos)=>{
		const user = {...socket.user,geopos}
		//console.log("Utilisateur Accédé", user)

		io.emit("ngmap-user-position-get", geopos)
	})
	socket.on('ngmap-user-position-error', () => {
		console.log("ERRER DE LOCALISATION : NON PERMIS")
	});

	socket.on("click-to-map", (myPosition) => {
		io.emit("click-to-map", myPosition)
	})
})

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT} to ual-app`)
})