const express = require("express")
,   router =  express.Router()
,   { root, signin, paieUser} = require("../controllers/auth")
,   { newUser, getUserAll, getUserOne, editUser, deleteUser} = require("../controllers/user")
,   { createPaie} = require("../controllers/paie");

router.get("/", root)
router.post("/", signin)
router.post("/user-form-add", newUser)
router.get("/get-user-all", getUserAll)
router.get("/user-get-one", getUserOne)
router.put("/user-edit", editUser, getUserOne)
router.post("/user-paie", createPaie)
router.delete("/user-delete", deleteUser)
router.get("/paie", paieUser)

module.exports = router 