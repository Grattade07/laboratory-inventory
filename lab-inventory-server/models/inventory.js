/* Schema for lab inventory items */

const mongoose = require("mongoose")

let InventorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type:String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Inventory", InventorySchema)