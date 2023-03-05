let express = require('express');
let router = express.Router();

/* routes for all user requests */

const users = require("../controllers/users.controller.js");
const { changePasswordVerification } = require('./usersMiddleware.js');

router.get("/", users.findAll)

router.post("/register", users.createUser)

router.post("/login", users.loginUser)

router.put("/changePassword", changePasswordVerification, users.changeUserPassword)

module.exports = router