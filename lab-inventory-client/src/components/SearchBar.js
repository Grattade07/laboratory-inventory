import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from 'react-bootstrap/InputGroup'
/* seach icon imported from  https://fontawesome.com */
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { displayFilteredList, resetDisplayList } from "../store/inventory"
import { useState } from "react"

/* component used to search for item in the inventory */
function SearchBar () {
    const [filterString, setFilterString] = useState("")
    const dispatch = useDispatch()

    return (
        <section id="item-search">
            <InputGroup id="search-bar">
                    <Form.Control type="text" placeholder="Search Item..." id="search-input" onChange={(e) => setFilterString(e.target.value)}
                    
                    value={filterString}/>

                    {/* button filters the inventory based on the input value */}
                    <Button onClick={() => {
                        dispatch(displayFilteredList(filterString))
                        setFilterString("")
                        }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
            </InputGroup>

            {/* button clears the search parameters */}
            <Button variant="secondary" onClick={() => {
                dispatch(resetDisplayList())
                }}
                id="clear-search">
                Clear Search
            </Button>
        </section>
    )
}

export default SearchBar