const ClassRoom = require("../models/user"),
	{createUser, findUser, usersNoMe, getUserAll} = require("../models/user"),
	{ getDocAll} = require("../models/doc"),
	md5 = require("md5");

exports.usersNoMe = async (req, res) => {
	try {
		const data = await usersNoMe(req.session.userSession._id)
		return res.json({ flash:"succMsg", users: JSON.stringify(data) })
	} catch (error) {
		console.log(error);
	}
}

exports.getUserAll = async (req, res) => {
	try {
		const data = await getUserAll()
		return res.json({ flash:"succMsg", users: JSON.stringify(data) })
	} catch (error) {
		console.log(error);
	}
}

exports.createUser = async (req, res) => {
	try {
		const { mail, phone, matricule, role, fullname } = req.body;
		const data = await createUser({mail,phone,matricule,role, fullname});
		return res.json({ flash:"succMsg", users: JSON.stringify(data) })
	} catch (error) {
		console.log(error);
	}
}