/* Controller for the UserSchema model */

const User = require("../models/users.js")

let jwt = require("jsonwebtoken")

/* finds all documents in the users collection */
exports.findAll = function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err)
            res.status(500).send({message: "An error occurred while retrieving the list of users"})
        } else {
            res.send(users)
        }
    })
}

/* create new User document */
exports.createUser = function (req, res) {
    /* gets all user documents */
    User.find(function(err, users) {
        if(err) {
            console.log(err)
            res.status(500).send({message: "An error occurred while retrieving the list of users"})
        } else {
            /* checks if the username aleady exists */
            for (let i = 0; i < users.length; i++){
                if (users[i].username == req.body.username) {
                    return res.send({message : "This user already exists"})
                }
            }

            /* creates new user if the username is new */
            let userModel = new User({
                username: req.body.username,
                password: req.body.password,
                admin: req.body.admin
            })
        
                userModel.save(function (err, data) {
                    if(err) {
                        console.log(err)
                        res.status(500).send({message: "An error occurred while creating the user account"})
                    } else {
                        let jwToken = jwt.sign({
                            username: data.username,
                            password: data.password,
                            isAdmin: data.admin
                        },
                        "secretKey"
                        )
                        res.send({
                            message: "Account has been successfully created",
                            isLoggedIn : true,
                            token: jwToken,
                            isAdmin: data.admin
                        })
                    }
                })
        }
    })
}

/* find user account */
exports.loginUser = function (req,res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err)
            res.status(500).send({message: "An error occurred while retrieving the list of users"})
        } else {
            /* checks if the user exists */
            for (let i = 0; i <= users.length; i++){
            if (i == users.length) {

                /* sends message if user does not exist */
                return res.send({message: "User does not exist"})

            } else if (users[i].username == req.body.username && users[i].password == req.body.password) {
                    let jwToken = jwt.sign({
                        username: users[i].username,
                        password: users[i].password,
                        isAdmin: users[i].admin
                    },
                    "secretKey"
                    )

                    return res.send({
                        message : "Login Successful",
                        isLoggedIn : true,
                        token: jwToken,
                        isAdmin: users[i].admin
                    })
                } else if (users[i].username == req.body.username && users[i].password != req.body.password) {
                    /* sends message if username matches but password is incorrect */
                    return res.send({message: "Password Incorrect"})
                }
                
        }
        }
    })
}

/* updates the user password */
exports.changeUserPassword = function (req, res) {
    User.updateOne({ username: req.body.username}, {$set: { password: req.newUserPassword}}, function (err, user) {
        if (err) {
            res.send({message: "Error Occurred updating Password"})
        } else {
            res.send({message: "Password Successfully Updated"})
        }
    })    
}

