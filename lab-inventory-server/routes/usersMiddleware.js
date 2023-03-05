let jwt  = require("jsonwebtoken")

/* checks that the new and confirmed passowords are the same */
function changePasswordVerification (req, res, next) {
    if (
        req.body.newPassword === req.body.confirmPassword 
    ) {
        req.newUserPassword = req.body.newPassword
        next()
    } else {
        res.send({message: "New Password and Confirmation Password do not match"})
    }
}

module.exports ={
    changePasswordVerification
}