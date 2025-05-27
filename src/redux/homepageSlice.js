import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHomePageStats = createAsyncThunk('home/fetchHomePageStats', async () => {
    const customerCountRes = await axios.get('https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/customers/count');
    const storeCountRes = await axios.get('https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/stores/count');
    const salesCountRes = await axios.get('https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/sales/count');
    const productCountRes = await axios.get('https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/products/count');

    return {
        customers: customerCountRes.data.count,
        totalSales: salesCountRes.data.totalSales,
        stores: storeCountRes.data.storeCount,
        products: productCountRes.data.count
    };
});

const initialState = {
    customers: null,
    totalSales: null,
    stores: null,
    products: null,
    loading: false,
    error: null
};

const homePageSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomePageStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHomePageStats.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload.customers;
                state.totalSales = action.payload.totalSales;
                state.stores = action.payload.stores;
                state.products = action.payload.products;
            })
            .addCase(fetchHomePageStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default homePageSlice.reducer;
