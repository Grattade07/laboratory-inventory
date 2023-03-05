let express = require('express');
let router = express.Router();

/* routes for all invenotry requests */

const inventory = require("../controllers/inventory.controller.js");
const { checkJWTTokenAdmin } = require('./inventoryMiddleware.js');

router.get("/getInventory", inventory.findAllInventory)

router.post("/createItem", checkJWTTokenAdmin, inventory.createItem)

router.put("/increaseQuantity", checkJWTTokenAdmin, inventory.increaseItemQuantity)

router.put("/decreaseQuantity", checkJWTTokenAdmin, inventory.decreaseItemQuantity)

router.delete("/deleteItem", checkJWTTokenAdmin, inventory.deleteItem)

module.exports = router