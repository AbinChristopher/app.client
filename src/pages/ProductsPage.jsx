import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateProduct } from '../redux/productSlice';
import './ProductsPage.css';
import ProductList from '../Components/ProductList';
import ProductForm from '../Components/ProductForm';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleSave = () => {
        setShowForm(false);
        setEditingProduct(null);
        dispatch(fetchProducts()); 
    };

    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="products-container">
            <h1>Product List</h1>
            <button className="add-new-product" onClick={handleAddNew}>
                Add New Product
            </button>
            <ProductList onEdit={handleEdit} />

            {showForm && (
                <ProductForm product={editingProduct} onSave={handleSave} />
            )}
        </div>
    );
};

export default ProductsPage;
