import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './customersSlice';
import productsReducer from './productSlice';
import salesReducer from './salesSlice';
import storesReducer from './storeSlice';
import homePageReducer from './homepageSlice';  // Import the new homePageSlice

const store = configureStore({
    reducer: {
        customers: customersReducer,
        products: productsReducer,
        sales: salesReducer,
        stores: storesReducer,
        home: homePageReducer,  // Add homePageReducer here
    },
});

export default store;
