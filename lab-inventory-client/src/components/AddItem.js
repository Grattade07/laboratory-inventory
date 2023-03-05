import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInventoryCount } from "../store/inventory";

/* component used to add new items to the inventory database */
function AddItem () {
    const [itemName, handleItemName] = useState("")
    const [location, handleLocation] = useState("")
    const [batch, handleBatch] = useState("")
    const [quantity, handleQuantity] = useState("")
    const [expiryDate, handleExpiryDate] = useState("")
    const [purchaseUrl, handlePurchaseUrl] = useState("")

    const dispatch = useDispatch()

    const token = useSelector((state) => state.inventory.userJWToken)

    const isAdmin = useSelector((state) => state.inventory.isAdmin)

    /* function sends post request to add new item to database */
    function postNewItem(url = "", data = {}) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "token" : token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(dispatch(updateInventoryCount()))
    }

    /* function resets all input values */
    function resetInput() {
        handleItemName("")
        handleLocation("")
        handleBatch("")
        handleQuantity("")
        handleExpiryDate("")
        handlePurchaseUrl("")
    }

    return (
        <section id="add-item-container">

            <div>
                <h4 className="underline">Add New Item</h4>
            </div>
            
            <Form id="add-item-form" >
                {/* input for item name */}
                <Form.Group className="underline">
                    <Form.Label>Item Name:</Form.Label>
                    <Form.Control data-testid="item-add-name" name="name" type="text" placeholder="Example: Ethanol" onChange={(e) => handleItemName(e.target.value)} value={itemName}/>
                </Form.Group>
                {/* input for item location */}
                <Form.Group className="underline">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control data-testid="item-add-location"  name="location" type="text" placeholder="Example: Cupboard" onChange={(e) => handleLocation(e.target.value)} value={location}/>
                </Form.Group>
                {/* input for batch */}
                <Form.Group className="underline">
                    <Form.Label>Batch No.:</Form.Label>
                    <Form.Control data-testid="item-add-batch" name="batch" type="text" placeholder="Example: #1EF43T" onChange={(e) => handleBatch(e.target.value)} value={batch}/>
                </Form.Group>
                {/* input for quantity */}
                <Form.Group className="underline">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control data-testid="item-add-quantity"  name="quantity" type="text" placeholder="Example: 53" onChange={(e) => handleQuantity(e.target.value)} value={quantity}/>
                </Form.Group>
                {/* input for expiry date */}
                <Form.Group className="underline">
                    <Form.Label>Expiry Date:</Form.Label>
                    <Form.Control data-testid="item-add-expiry"  name="expiry" type="date" onChange={(e) => handleExpiryDate(e.target.value)} value={expiryDate}/>
                </Form.Group>
                {/* input for url to purchase item */}
                <Form.Group className="underline">
                    <Form.Label>Purchase URL:</Form.Label>
                    <Form.Control data-testid="item-add-url"  name="url" type="text" placeholder="Example: www.amazon.co.uk" onChange={(e) => handlePurchaseUrl(e.target.value)} value={purchaseUrl}/>
                </Form.Group>

                {/* button sends request to add new item. Is disabled if user is not an admin */}
                <Button variant="secondary" id="add-item-submit"onClick={() => {
                    postNewItem("/inventory/createItem", {
                    name: itemName,
                    location: location,
                    batch: batch,
                    quantity: quantity,
                    expiryDate: expiryDate,
                    url: purchaseUrl
                    })
                    resetInput()
                }} disabled={isAdmin ? false : true}>Submit</Button>
            </Form>
        </section>
    )
}

export default AddItem