const {createUser, findUser} = require("../models/user"),
	md5 = require("md5");

exports.root = async (req, res) => {
	res.render("./auth/signin")
}

exports.signin = async (req, res) => {
    const { login, password } = req.body

	try {
		const checkUser = await createUser({login, password:md5(password)});
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