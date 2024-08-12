const {createUser, getUserAll} = require("../models/user-client"),
  md5 = require("md5");

exports.newUser = async (req, res) => {
  const user  = req.body
  const contact = req.body["contact"]
  delete req.body["contact"]
  user.contact = contact.join(",")
  try {
    
    await createUser(user).then(data =>{
      console.log(user)
      return res.json({ flash:'succMsg', descript: "ajout éffectué avec succès", data })
    })
  } catch (error) {
    console.log(error);
  }
}

exports.getUserAll = async (req, res) => {
  try {

    await getUserAll().then(data =>{
      return res.json({ flash:'succMsg', descript: "Recherche réussie avec succès", data })
    })
  } catch (error) {
    console.log(error);
  }
}
