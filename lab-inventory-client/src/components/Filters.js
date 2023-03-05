import Form from "react-bootstrap/Form"
import { useDispatch } from "react-redux"
import { displayBatchSortedList, displayExpirySortedList, displayItemSortedList, displayList, displayLocationSortedList, displayQuantitySortedList } from "../store/inventory"

/* component used to sort the inventory list */
function Filters() {
    const dispatch = useDispatch()

    return (
        <section id="filters-container">
            <h4 className="underline">Sort By:</h4>

            <Form id="filter-list" >
                {/* check shows the default ordering */}
                <Form.Check 
                    type="radio"
                    label="None"
                    name="filter"
                    defaultChecked
                    onClick={() => dispatch(displayList())}
                />
                {/* check sorts by item name */}
                <Form.Check 
                    type="radio"
                    label="Item"
                    name="filter"
                    onClick={() => dispatch(displayItemSortedList())}
                />
                {/* check sorts by lcoatio name */}
                <Form.Check 
                    type="radio"
                    label="Location"
                    name="filter"
                    onClick={() => dispatch(displayLocationSortedList())}
                />
                {/* check sorts by batch */}
                <Form.Check 
                    type="radio"
                    label="Batch"
                    name="filter"
                    onClick={() => dispatch(displayBatchSortedList())}
                />
                {/* check sorts by quantity */}
                <Form.Check 
                    type="radio"
                    label="Quantity"
                    name="filter"
                    onClick={() => dispatch(displayQuantitySortedList())}
                />
                {/* check sorts by expiry date */}
                <Form.Check 
                    type="radio"
                    label="Expiry Date"
                    name="filter"
                    onClick={() => dispatch(displayExpirySortedList())}
                />
            </Form>
            
        </section>
    )
}

export default Filters