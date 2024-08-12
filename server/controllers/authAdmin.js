const {createUser, findUser} = require("../models/userAdmin"),
	md5 = require("md5");

exports.root = async (req, res) => {
	res.render("./admin/auth/signin")
}

exports.signin = async (req, res) => {
    const { login, password } = req.body
    
	try {
		const checkUser = await findUser();
		console.log(checkUser)
		if(checkUser){
			req.session.userSession = res.locals.userSession = checkUser;
			return res.render('./admin/pages/');
		}
		res.redirect('/admin')
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
			return res.render('./admin/pages/');
		}
		res.redirect('/')
	} catch (error) {
		console.log(error);
	}
}