import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { createSale, updateSale } from '../redux/salesSlice';

const SaleForm = ({ sale, onSave, customers = [], products = [], stores = [] }) => {
    const [dateSold, setDateSold] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [storeId, setStoreId] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (sale) {
            setDateSold(sale.dateSold.slice(0, 10));
            setCustomerId(sale.customerId);
            setProductId(sale.productId);
            setStoreId(sale.storeId);
        }
    }, [sale]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const saleData = { dateSold, customerId, productId, storeId };

        try {
            if (sale) {
                await dispatch(updateSale({ ...saleData, id: sale.id }));
            } else {
                await dispatch(createSale(saleData));
                setDateSold('');
                setCustomerId('');
                setProductId('');
                setStoreId('');
            }
            onSave();
        } catch (error) {
            console.error('Error saving sale:', error);
        }
    };

    const customerOptions = customers.map(c => ({
        key: c.id,
        text: c.name,
        value: c.id,
    }));

    const productOptions = products.map(p => ({
        key: p.id,
        text: p.name,
        value: p.id,
    }));

    const storeOptions = stores.map(s => ({
        key: s.id,
        text: s.name,
        value: s.id,
    }));

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field required>
                <label>Date Sold</label>
                <Form.Input
                    type="date"
                    value={dateSold}
                    onChange={(e) => setDateSold(e.target.value)}
                />
            </Form.Field>

            <Form.Field required>
                <label>Customer</label>
                <Dropdown
                    placeholder='Select a customer'
                    fluid
                    selection
                    options={customerOptions}
                    value={customerId}
                    onChange={(e, { value }) => setCustomerId(value)}
                />
            </Form.Field>

            <Form.Field required>
                <label>Product</label>
                <Dropdown
                    placeholder='Select a product'
                    fluid
                    selection
                    options={productOptions}
                    value={productId}
                    onChange={(e, { value }) => setProductId(value)}
                />
            </Form.Field>

            <Form.Field required>
                <label>Store</label>
                <Dropdown
                    placeholder='Select a store'
                    fluid
                    selection
                    options={storeOptions}
                    value={storeId}
                    onChange={(e, { value }) => setStoreId(value)}
                />
            </Form.Field>

            <Button type='submit' primary>
                {sale ? 'Update Sale' : 'Create Sale'}
            </Button>
        </Form>
    );
};

export default SaleForm;
