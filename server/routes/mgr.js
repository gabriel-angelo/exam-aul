const express = require("express")
,   router =  express.Router()
,   { usersNoMe, getUserAll } = require("../controllers/mgr")

router.get("/get-user-all", getUserAll);
//router.get("/get-document-all", getDocAll);

module.exports = router 