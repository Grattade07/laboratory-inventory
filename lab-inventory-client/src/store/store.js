import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./inventory"

/* store for application */
export default configureStore({
    reducer: {
        inventory : inventoryReducer
    }
})