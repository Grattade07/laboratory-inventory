import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus, faMinus, faXmark} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from 'react-redux';
import { updateInventoryList, displayList, updateInventoryCount } from '../store/inventory';

/* component for the table that will display the  */
function ProductTable () {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    /* state selectors */

    const inventory = useSelector((state) => state.inventory.displayedInventoryList)

    const updatedCount = useSelector((state) => state.inventory.inventoryUpdateCount)

    const token = useSelector((state) => state.inventory.userJWToken)

    const isLoggedIn = useSelector((state) => state.inventory.isLoggedIn)

    const isAdmin = useSelector((state) => state.inventory.isAdmin)

    /* function sends a get reqeust to receive the inventory list from the database */
    function componentDidMount() {
        fetch("/inventory/getInventory")
          .then(res => res.json())
          .then(
            (result) => {
            setIsLoaded(true)
            dispatch(updateInventoryList(result))
            dispatch(displayList())
          },
          (error) => {
            setIsLoaded(true)
            setError(error)
          } ) 
        }
    
    /* function sends a put request to increment the value of a given item */
    function increaseQuantity(url ="", data = {}) {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token" : token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => dispatch(updateInventoryCount()))
    }

    /* function sends a put request to decrement the value of a given item */
    function decreaseQuantity(url ="", data = {}) {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token" : token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => dispatch(updateInventoryCount()))
    }

    /* function sends a delete request to remove an item from the database */
    function deleteItem(url ="", data ={}) {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                "token" : token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => dispatch(updateInventoryCount()))
    }

    /* componentDidMount function runs on page load and when "updatedCount" changes */
    useEffect(() => componentDidMount(), [updatedCount])

    /* shows if there was an error getting the data */
    if (error) {
        return (
        <div id="table-container">
            <Table id="product-table" bordered striped>
                <thead id="table-header">
                    <tr>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Batch</th>
                        <th>Quantity</th>
                        <th>Expiry Date</th>
                        <th>Purchase Link</th>
                    </tr>
                </thead>

                <tbody style={{height: "auto"}}>
                    <tr><td>Error: {error}</td></tr>
                </tbody>
            </Table>
        </div>
        )
    } 
    /* shows if the user is not logged in */
    else if (!isLoggedIn) {
        return (
            <div id="table-container">
                <Table id="product-table" bordered striped>
                    <thead id="table-header">
                        <tr>
                            <th>Item</th>
                            <th>Location</th>
                            <th>Batch</th>
                            <th>Quantity</th>
                            <th>Expiry Date</th>
                            <th>Purchase Link</th>
                        </tr>
                    </thead>
    
                    <tbody style={{height: "100%"}}>
                        <tr><td colSpan={6} rowSpan={11}>Please Login to see inventory...</td></tr>
                    </tbody>
                </Table>
            </div>
            )
    } 
    /* shows if the table has not loaded yet */
    else if(!isLoaded) {
        return (
        <div id="table-container">
            <Table id="product-table" bordered striped>
                <thead id="table-header">
                    <tr>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Batch</th>
                        <th>Quantity</th>
                        <th>Expiry Date</th>
                        <th>Purchase Link</th>
                    </tr>
                </thead>

                <tbody style={{height: "auto"}}>
                    <tr><td colSpan={6} rowSpan={11}>Getting Items...</td></tr>
                </tbody>
            </Table>
        </div>
        )
    } 
    /* shows the inventory table */
    else {
    return (
        <div id="table-container">
            <Table id="product-table" bordered striped>
                <thead id="table-header">
                    <tr>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Batch</th>
                        <th>Quantity</th>
                        <th>Expiry Date</th>
                        <th>Purchase Link</th>
                        <th>Remove</th>
                    </tr>
                </thead>

                <tbody>
                    {inventory.map(item => (
                        <tr key={item._id}>

                            <td>{item.name}</td>

                            <td>{item.location}</td>

                            <td>{item.batch}</td>
                            
                            <td className='item-quantity-display'>
                                {/* button sends request to increase item quantity. Is disabled if user is not an admin */}
                                <Button className='quantity-button' disabled={isAdmin ? false : true} onClick={() => {
                                    increaseQuantity("/inventory/increaseQuantity", {
                                        id: item._id,
                                        quantity: item.quantity + 1
                                    })
                                }
                                }>
                                    <FontAwesomeIcon icon={faPlus} className="quantity-button-icon"></FontAwesomeIcon>
                                </Button>

                                <div className="item-quantity">{item.quantity}</div>

                                {/* button sends request to decrease item quantity. Is disabled if user is not an admin */}
                                <Button className='quantity-button' disabled={isAdmin ? false : true} onClick={() => 
                                    decreaseQuantity("/inventory/decreaseQuantity", {
                                        id: item._id,
                                        quantity: item.quantity - 1
                                    })
                                }>
                                    <FontAwesomeIcon icon={faMinus} className="quantity-button-icon">
                                    </FontAwesomeIcon>
                                </Button>
                            </td>

                            <td>{item.expiryDate}</td>

                            {/* href opens link in new tab */}
                            <td>
                                <Button href={`https://${item.url}`} target="_blank" disabled={isAdmin ? false : true}>Purchase</Button>
                            </td>

                            <td>
                                {/* button sends request to delete the item. Is disabled if user is not an admin */}
                                <Button variant="danger" onClick={() => 
                                    deleteItem("/inventory/deleteItem", {
                                        id: item._id
                                    })
                                } disabled={isAdmin ? false : true}>
                                    <FontAwesomeIcon icon={faXmark} ></FontAwesomeIcon>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
    }
}

export default ProductTable