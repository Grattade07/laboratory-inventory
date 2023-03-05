/* Controller for the InventorySchema model */

const Inventory = require("../models/inventory.js")

/* finds all items in the inventory */
exports.findAllInventory = function(req, res) {
    Inventory.find(function(err, inventories) {
        if (err) {
            console.log("Error occurred")
            res.status(500).send({message: "An error occurred while retrieving the inventory"})
        } else {
            res.send(inventories)
        }
    })
}

/* creates new iventory item */
exports.createItem = function (req, res) {
    let itemModel = new Inventory({
        name: req.body.name,
        location: req.body.location,
        batch: req.body.batch,
        quantity: req.body.quantity,
        expiryDate: req.body.expiryDate,
        url: req.body.url
    })

    itemModel.save(function(err, data) {
        if(err) {
            res.status(500).send({message: "An error occurred while creating the new item"})
        } else {
            res.send({message: "Item has been successfully created"})
        }
    })
}

/* increases the quantity of the given item */
exports.increaseItemQuantity = function (req, res) {
    Inventory.updateOne({_id: req.body.id}, {$set: {quantity : req.body.quantity}}, function(err, item) {
        if (err) {
            res.send({message: "Something went wrong updating the item quantity"})
        } else {
            res.send({message: "Quantity successfully increased"})
        }
    })
}

/* decreases the quantity of the given item */
exports.decreaseItemQuantity = function (req, res) {
    Inventory.updateOne({_id: req.body.id}, {$set: {quantity : req.body.quantity}}, function(err, item) {
        if (err) {
            res.send({message: "Something went wrong updating the item quantity"})
        } else {
            res.send({message: "Quantity successfully decreased"})
        }
    })
}

/* deletes item that matches the given id */
exports.deleteItem = function (req, res) {
    Inventory.deleteOne({_id: req.body.id}, function(err, item) {
        if(err) {
            res.send({message: "An error occured when deleting the item"})
        } else {
            res.send({message: "Item successfully removed"})
        }
    })
}