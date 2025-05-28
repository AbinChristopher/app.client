import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../redux/customersSlice';
import CustomerList from '../Components/CustomersList';
import CustomerForm from '../Components/CustomerForm';
import './CustomerPage.css';

const CustomerPage = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers.customers);
    const loading = useSelector(state => state.customers.loading);
    const error = useSelector(state => state.customers.error);

    const [editingCustomer, setEditingCustomer] = useState(null);
    const [isAddingCustomer, setIsAddingCustomer] = useState(false); 
    const [updatedName, setUpdatedName] = useState('');
    const [updatedAddress, setUpdatedAddress] = useState('');

    useEffect(() => {
        dispatch(fetchCustomers()); 
    }, [dispatch]);

    
    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setUpdatedName(customer.name);
        setUpdatedAddress(customer.address);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (editingCustomer) {
            const updatedCustomer = {
                ...editingCustomer,
                name: updatedName,
                address: updatedAddress,
            };

            dispatch(updateCustomer(updatedCustomer)).then(() => {
                dispatch(fetchCustomers()); 
            });

            setEditingCustomer(null); 
        }
    };

    const handleAddCustomer = () => {
        setIsAddingCustomer(true); 
    };

    const handleCloseForm = () => {
        setIsAddingCustomer(false); 
        setUpdatedName('');
        setUpdatedAddress('');
    };

    if (loading) return <p>Loading customers...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Customer List</h1>
            <button className="add-new-customer" onClick={handleAddCustomer}>
                Add Customer
            </button>

            <CustomerList customers={customers} onEdit={handleEdit} />

        
            {editingCustomer && (
                <form onSubmit={handleUpdate}>
                    <h2>Edit Customer</h2>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Address: </label>
                        <input
                            type="text"
                            value={updatedAddress}
                            onChange={(e) => setUpdatedAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingCustomer(null)}>
                        Cancel
                    </button>
                </form>
            )}

           
            {isAddingCustomer && (
                <CustomerForm
                    customer={null} 
                    onSave={handleCloseForm} 
                />
            )}
        </div>
    );
};

export default CustomerPage;
