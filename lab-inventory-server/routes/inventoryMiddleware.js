let jwt  = require("jsonwebtoken")

/* verifies the JWT token that is sent has admin permission */
function checkJWTTokenAdmin (req, res, next) {
    if (req.headers.token) {
        let token  = req.headers.token
        jwt.verify(token, "secretKey", function(error, data) {
            if (error) {
                res.status(500).send({message : "You must login to add a task"})
                next()
            } else if (!data.isAdmin) {
                res.send({message: "You must be an admin to add a new Item"})
                next()
            } else {
                next()
            }
        })
    } else {
        res.send({message : "No token attached to the request"})
    }
}

module.exports = {
    checkJWTTokenAdmin
}
