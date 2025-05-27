import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
    const response = await axios.get('https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/sales');
    return response.data;
});

export const createSale = createAsyncThunk('sales/createSale', async (newSale) => {
    const response = await axios.post('https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/sales', newSale);
    return response.data;
});

export const updateSale = createAsyncThunk('sales/updateSale', async (updatedSale) => {
    const response = await axios.put(`https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/sales/${updatedSale.id}`, updatedSale);
    return response.data;
});

export const deleteSale = createAsyncThunk('sales/deleteSale', async (saleId) => {
    await axios.delete(`https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/sales/${saleId}`);
    return saleId;
});

const initialState = {
    sales: [],
    loading: false,
    error: null,
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.loading = false;
                state.sales = action.payload;
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createSale.fulfilled, (state, action) => {
               
                state.sales.push(action.payload);
            })
            .addCase(updateSale.fulfilled, (state, action) => {
             
                const index = state.sales.findIndex((s) => s.id === action.payload.id);
                if (index !== -1) {
                    state.sales[index] = action.payload;
                }
            })
            .addCase(deleteSale.fulfilled, (state, action) => {
                state.sales = state.sales.filter((s) => s.id !== action.payload);
            });
    },
});

export default salesSlice.reducer;
