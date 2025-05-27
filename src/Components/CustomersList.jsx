import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer } from '../redux/customersSlice';
import { FiEdit, FiTrash } from 'react-icons/fi'; 


const Modal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{message}</h2>
                <div className="modal-actions">
                    <button className="confirm-button" onClick={onConfirm}>Yes, Delete</button>
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const CustomerList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customers.customers);
    const loading = useSelector((state) => state.customers.loading);

    const [showModal, setShowModal] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

   
    const handleDeleteClick = (id) => {
        setSelectedCustomerId(id);
        setShowModal(true);
    };

  
    const handleConfirmDelete = () => {
        dispatch(deleteCustomer(selectedCustomerId));
        setShowModal(false); 
    };

    const handleCancelDelete = () => {
        setShowModal(false); 
        setSelectedCustomerId(null); 
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="customer-container">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td className="button-container">
                                <button className="edit-button" onClick={() => onEdit(customer)}>
                                    <FiEdit /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(customer.id)}>
                                    <FiTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            {showModal && (
                <Modal
                    message="Are you sure you want to delete this customer?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default CustomerList;
