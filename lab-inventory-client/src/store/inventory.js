import {createSlice, current} from "@reduxjs/toolkit"

/* state slice for the application */
export const inventorySlice = createSlice({
    name: "inventory",

    /* initial set states */
    initialState: {
        inventoryUpdateCount: 0,
        inventoryList: [],
        displayedInventoryList: [],
        userJWToken: "",
        isAdmin: false,
        isLoggedIn: false
    },

    /* reducers to change state */
    reducers: {
        /* increments the update count */
        updateInventoryCount: (state) => {
            state.inventoryUpdateCount += 1
        },
        /* updates the inventory list */
        updateInventoryList: (state, action) => {
            state.inventoryList = action.payload
        },
        /* updates to the default inventory list to be shown in the table */
        displayList: (state) => {
            state.displayedInventoryList = state.inventoryList
        },
        /* makes the displayed table sorted by item name */
        displayItemSortedList: (state) => {
            state.displayedInventoryList = state.inventoryList.sort((p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0)
        },
        /* makes the displayed table sorted by item location */
        displayLocationSortedList: (state) => {
            state.displayedInventoryList = state.inventoryList.sort((p1, p2) => (p1.location > p2.location) ? 1 : (p1.location < p2.location) ? -1 : 0)
        },
        /* makes the displayed table sorted by item batch */
        displayBatchSortedList: (state) => {
            state.displayedInventoryList = state.inventoryList.sort((p1, p2) => (p1.batch > p2.batch) ? 1 : (p1.batch < p2.batch) ? -1 : 0)
        },
        /* makes the displayed table sorted by item quantity */
        displayQuantitySortedList: (state) => {
            state.displayedInventoryList = state.inventoryList.sort((p1, p2) => (p1.quantity > p2.quantity) ? 1 : (p1.quantity < p2.quantity) ? -1 : 0)
        },
        /* makes the displayed table sorted by item expiry */
        displayExpirySortedList: (state) => {
            state.displayedInventoryList = state.inventoryList.sort((p1, p2) => (p1.expiryDate > p2.expiryDate) ? 1 : (p1.expiryDate < p2.expiryDate) ? -1 : 0)
        },
        /* updates the stored JWToken */
        addJWToken: (state, action) => {
            state.userJWToken = action.payload
        },
        /* removes the stored JWToken */
        removeJWToken: (state) => {
            state.userJWToken = ""
        },
        /* changes the displayed table to what was search in the search bar */
        displayFilteredList: (state, action) => {
            let filterString = action.payload
            /* current function gets the current state of the inventoryList state. Found this function from url: https://redux-toolkit.js.org/api/other-exports#current */
            let inventoryList = current(state.inventoryList)
            let filteredList = function(string) {
                let filteredList = []

                for (let i = 0; i < inventoryList.length; i++) {
                    if(inventoryList[i].name.toLowerCase().includes(string)) {
                        filteredList.push(inventoryList[i])
                    }
                }

                return filteredList
            }

            state.displayedInventoryList = filteredList(filterString)
        },
        /* resets the displayed list to the original data */
        resetDisplayList: (state) => {
            state.displayedInventoryList = state.inventoryList
        },
        /* updates if user is admin */
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
        /* updates if user is logged in */
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const {
    updateInventoryCount, 
    updateInventoryList, 
    displayList, 
    displayItemSortedList, 
    displayLocationSortedList, 
    displayBatchSortedList, 
    displayQuantitySortedList, 
    displayExpirySortedList, 
    addJWToken, 
    removeJWToken, 
    displayFilteredList, 
    resetDisplayList,
    setIsAdmin,
    setIsLoggedIn
} = inventorySlice.actions

export default inventorySlice.reducer