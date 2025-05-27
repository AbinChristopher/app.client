import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSale } from '../redux/salesSlice';
import { FiEdit, FiTrash } from 'react-icons/fi';
import '../pages/SalesPage.css'


const Modal = ({ message, onConfirm, onCancel }) => (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>{message}</h2>
            <div className="modal-actions">
                <button className="confirm-button" onClick={onConfirm}>
                    Yes, Delete
                </button>
                <button className="cancel-button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

const SaleList = ({ onEdit, sales }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [selectedSaleId, setSelectedSaleId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedSaleId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteSale(selectedSaleId));
        setShowModal(false);
        setSelectedSaleId(null);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedSaleId(null);
    };

    return (
        <div className="sale-container">
            <table className="sale-table">
                <thead>
                    <tr>
                        <th>Date Sold</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{new Date(sale.dateSold).toLocaleDateString()}</td>
                            <td>{sale.customerName}</td>
                            <td>{sale.productName}</td>
                            <td>{sale.storeName}</td>
                            <td className="button-container">
                                <button
                                    className="edit-button"
                                    onClick={() => onEdit(sale)}
                                    aria-label={`Edit sale for ${sale.productName}`}
                                >
                                    <FiEdit /> Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteClick(sale.id)}
                                    aria-label={`Delete sale for ${sale.productName}`}
                                >
                                    <FiTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <Modal
                    message="Are you sure you want to delete this sale?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default SaleList;
