const express = require("express")
,   router =  express.Router()
,   { root, signin} = require("../controllers/auth")
,   { newUser, getUserAll, getUserOne, editUser, deleteUser} = require("../controllers/user");

router.get("/", root)
router.post("/", signin)
router.post("/user-form-add", newUser)
router.get("/get-user-all", getUserAll)
router.get("/user-get-one", getUserOne)
router.put("/user-form-edit", editUser)
router.delete("/user-delete", deleteUser)

module.exports = router 