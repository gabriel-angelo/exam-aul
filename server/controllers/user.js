const {invoiceUser} = require("../models/paie")
const {createUser, getUserAll, findUser, editUser, deleteUser} = require("../models/user-client"),
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

exports.getUserOne = async (req, res) => {
  try {
    let {id}=req.query
    if (res.checkupdate) {
      console.log("Apdate check user",res.checkupdate);
      id = res.checkupdate
    }
    
    await findUser(id).then(data =>{
      return res.json({ flash:'succMsg', descript: "Recherche réussie avec succès", data })
    })
  } catch (error) {
    console.log(error);
  }
}

exports.editUser = async (req, res, next) => {
  const user=req.body
  
  const contact = req.body["contact"]
  delete req.body["contact"]
  user.contact = contact.join(",")
  try {
    const id = user.id
    const updateUser = await editUser(user)
     res.checkupdate = id
     next();
  } catch (error) {
    console.log(error);
  }
}

exports.deleteUser = async (req, res) => {
  const {id} = req.body
  
  try {
    await deleteUser(id).then(data =>{
      return res.json({ flash:'succMsg', descript: "Identité modifiée", data:id })
    })
  } catch (error) {
    console.log(error);
  }
}