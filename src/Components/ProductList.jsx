import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../redux/productSlice';
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

const ProductList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);

    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedProductId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteProduct(selectedProductId));
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedProductId(null);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="product-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td className="button-container">
                                <button className="edit-button" onClick={() => onEdit(product)}>
                                    <FiEdit /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(product.id)}>
                                    <FiTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <Modal
                    message="Are you sure you want to delete this product?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default ProductList;
