import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores } from '../redux/storeSlice';
import './StorePage.css'; 
import StoreList from '../Components/StoreList';
import StoreForm from '../Components/StoreForm';

const StorePage = () => {
    const dispatch = useDispatch();
    const stores = useSelector((state) => state.stores.stores);
    const loading = useSelector((state) => state.stores.loading);
    const error = useSelector((state) => state.stores.error);

    const [editingStore, setEditingStore] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]);

    const handleEdit = (store) => {
        setEditingStore(store);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingStore(null);
        setShowForm(true);
    };

    const handleSave = () => {
        setShowForm(false);
        setEditingStore(null); 
    };

    if (loading) return <div className="loading">Loading stores...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="store-container">
            <h1>Store List</h1>
            <button className="add-new-store" onClick={handleAddNew}>
                Add New Store
            </button>
            <StoreList onEdit={handleEdit} />

            {showForm && (
                <StoreForm store={editingStore} onSave={handleSave} />
            )}
        </div>
    );
};

export default StorePage;
