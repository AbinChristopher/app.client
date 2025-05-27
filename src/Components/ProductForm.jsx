import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../redux/productSlice';

const ProductForm = ({ product, onSave }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = { name, price: parseFloat(price) };

        try {
            if (product) {
                await dispatch(updateProduct({ ...productData, id: product.id }));
            } else {
                await dispatch(createProduct(productData));
            }
            onSave(); // Callback to parent after saving the product
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Name</label>
                <Input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Field>

            <Form.Field>
                <label>Price</label>
                <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </Form.Field>

            <Button primary type="submit">
                {product ? 'Update Product' : 'Create Product'}
            </Button>
        </Form>
    );
};

export default ProductForm;
