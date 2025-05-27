import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchStores = createAsyncThunk('stores/fetchStores', async () => {
    const response = await axios.get('https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/stores');
    return response.data;
});

export const createStore = createAsyncThunk('stores/createStore', async (newStore) => {
    const response = await axios.post('https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/stores', newStore);
    return response.data;
});

export const updateStore = createAsyncThunk('stores/updateStore', async (updatedStore) => {
    const response = await axios.put(`https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/stores/${updatedStore.id}`, updatedStore);
    return response.data;
});

export const deleteStore = createAsyncThunk('stores/deleteStore', async (storeId) => {
    await axios.delete(`https://storeappv1-fhgfapfcdka6fqcd.australiaeast-01.azurewebsites.net/api/stores/${storeId}`);
    return storeId;
});

const initialState = {
    stores: [],
    loading: false,
    error: null,
};

const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStores.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStores.fulfilled, (state, action) => {
                state.loading = false;
                state.stores = action.payload;
            })
            .addCase(fetchStores.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createStore.fulfilled, (state, action) => {
                state.stores.push(action.payload);
            })
            .addCase(updateStore.fulfilled, (state, action) => {
                const index = state.stores.findIndex((store) => store.id === action.payload.id);
                if (index !== -1) {
                    state.stores[index] = action.payload;
                }
            })
            .addCase(deleteStore.fulfilled, (state, action) => {
                state.stores = state.stores.filter((store) => store.id !== action.payload);
            });
    },
});

export default storesSlice.reducer;
