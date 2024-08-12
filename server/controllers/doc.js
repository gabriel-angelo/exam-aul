const { findHolderAll, createHolder, assignHolder } = require("../models/doc");

exports.getDocAll = async (req, res) => {
	try {
		const data = await findHolderAll()
		return res.json({ flash:"succMsg", users: JSON.stringify(data) })
	} catch (error) {
		console.log(error);
	}
}

exports.createDoc = async (req, res) => {
	try {
		const { , phone, matricule, role, fullname } = req.body;
		const data = await createHolder({mail,phone,matricule,role, fullname});
		return res.json({ flash:"succMsg", users: JSON.stringify(data) })
	} catch (error) {
		console.log(error);
	}
}