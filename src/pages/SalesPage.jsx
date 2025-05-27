import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from '../redux/salesSlice';
import { fetchCustomers } from '../redux/customersSlice';
import { fetchProducts } from '../redux/productSlice';
import { fetchStores } from '../redux/storeSlice';
import SaleList from '../Components/SaleList';
import SaleForm from '../Components/SaleForm';
import './SalesPage.css';

const SalesPage = () => {
    const dispatch = useDispatch();

    const { sales, loading, error } = useSelector((state) => state.sales);
    const { customers, loading: customersLoading, error: customersError } = useSelector((state) => state.customers);
    const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
    const { stores, loading: storesLoading, error: storesError } = useSelector((state) => state.stores);

    const [showModal, setShowModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);

    useEffect(() => {
        dispatch(fetchSales());
        dispatch(fetchCustomers());
        dispatch(fetchProducts());
        dispatch(fetchStores());
    }, [dispatch]);

    const handleAddSale = () => {
        setSelectedSale(null);
        setShowModal(true);
    };

    const handleEditSale = (sale) => {
        setSelectedSale(sale);
        setShowModal(true);
    };

    const handleSave = () => {
        setShowModal(false);
        setSelectedSale(null);
        dispatch(fetchSales()); 
    };

    const handleCancel = () => {
        setShowModal(false);
        setSelectedSale(null);
    };

    
    const isLoading = loading || customersLoading || productsLoading || storesLoading;
    const hasError = error || customersError || productsError || storesError;

    return (
        <div className="Sales-container">
            <h1>Sales Management</h1>
            <button className="add-new-sale" onClick={handleAddSale}>
                Add New Sale
            </button>

            {isLoading ? (
                <p>Loading...</p>
            ) : hasError ? (
                <p style={{ color: 'red' }}>Error loading data: {hasError}</p>
            ) : sales.length === 0 ? (
                <p>No sales available.</p>
            ) : (
                <SaleList sales={sales} onEdit={handleEditSale} />
            )}

            {showModal && (
                <SaleForm
                    sale={selectedSale}
                    onSave={handleSave}
                    customers={customers || []}
                    products={products || []}
                    stores={stores || []}
                    onCancel={handleCancel}  
                />
            )}
        </div>
    );
};

export default SalesPage;
