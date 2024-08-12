const express = require("express")
,   router =  express.Router()
,   { root, signin} = require("../controllers/auth")
,   { newUser, getUserAll} = require("../controllers/user");

router.get("/", root)
router.post("/", signin)
router.post("/user-form-add", newUser)
router.get("/get-user-all", getUserAll)

module.exports = router 