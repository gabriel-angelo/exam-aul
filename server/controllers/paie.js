const {createPaie} = require("../models/paie")

  md5 = require("md5");

exports.createPaie = async (req, res) => {
  const user  = req.body
  console.log("PAIEMENT : ", user);
  
  try {
    await createPaie(user).then(data =>{
      console.log(user)
      return res.json({ flash:'succMsg', descript: "ajout éffectué avec succès", data })
    })
  } catch (error) {
    console.log(error);
  }
}
