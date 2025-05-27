import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStore } from '../redux/storeSlice';
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

const StoreList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const stores = useSelector((state) => state.stores.stores);
    const loading = useSelector((state) => state.stores.loading);

    const [showModal, setShowModal] = useState(false);
    const [selectedStoreId, setSelectedStoreId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedStoreId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteStore(selectedStoreId));
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedStoreId(null);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="store-container">
            <table className="store-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store) => (
                        <tr key={store.id}>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td className="button-container">
                                <button className="edit-button" onClick={() => onEdit(store)}>
                                    <FiEdit /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(store.id)}>
                                    <FiTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <Modal
                    message="Are you sure you want to delete this store?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default StoreList;
