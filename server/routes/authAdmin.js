const express = require("express")
,   router =  express.Router()
,   { root, signin } = require("../controllers/authAdmin");

router.get("/", root)
router.post("/", signin)

module.exports = router 