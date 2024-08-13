const md5 = require("md5");

const {createUser, findUser} = require("../models/user")
const	userStudent = require("../models/user-client").findUser

exports.root = async (req, res) => {
    const {u} = req.query
    if (u=="home") return res.render('./pages');
	res.render("./auth/signin")
}

exports.paieUser = async (req, res) => {
	const {id} = req.query;
	res.locals._USER_STUDIANT = await userStudent(id)
	res.render("./pages/paie-user")
}


exports.signin = async (req, res) => {
    const { login, password } = req.body

	try {
		console.log(md5("admin"));
		const checkUser = await findUser({login, password:md5(password)});
		if(checkUser){
			
			req.session.userSession = res.locals.userSession = checkUser;
			return res.render('./pages/');
		}
		res.redirect('/')
	} catch (error) {
		console.log(error);
	}
}

exports.logout = async (req, res) => {
    const { login, password } = req.body
	console.log(login, md5(password));
	try {
		const checkUser = await findUser({account:{login, password:md5(password),role:"ADMIN"}});
		if(checkUser){
			req.session.userSession = res.locals.userSession = checkUser;
			return res.render('./pages/');
		}
		res.redirect('/')
	} catch (error) {
		console.log(error);
	}
}


  