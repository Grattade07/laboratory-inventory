const express = require("express")

const app = express()

const bodyParser = require("body-parser")

require("dotenv").config()

const usersRouter = require("./routes/usersRoute")

const inventoryRouter = require("./routes/inventoryRoute")

const mongoose = require("mongoose")

/* uri to access the database */
const uri = process.env.MONGODB_URI

mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({extended: true }))

app.use(bodyParser.json())

/* server serves the build of the client */
app.use(express.static("../lab-inventory-client/build"))

/* set server to listen to port 3001 or given environment */
const port = process.env.PORT || 3001

module.exports = app.listen(port, function() {
    console.log(`Listening to port ${port}`)
})

/* connects to required database */
mongoose.connect(uri, {
    dbName: "LabInventory"
})

/* displays message when database connection is successful */
mongoose.connection.once("open", function () {
    console.log("Successfully connected to database")
})


/* displays message if connection to database could not be made and connection process is ended */
mongoose.connection.on("error", function() {
    console.log("Could not connect to database. Exiting now...")
    process.exit()
})

app.use("/users", usersRouter)

app.use("/inventory", inventoryRouter)
