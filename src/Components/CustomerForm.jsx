import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { createCustomer, updateCustomer } from '../redux/customersSlice';

const CustomerForm = ({ customer, onSave }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (customer) {
            setName(customer.name);
            setAddress(customer.address);
        }
    }, [customer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const customerData = { name, address };

        try {
            if (customer) {
                await dispatch(updateCustomer({ ...customerData, id: customer.id }));
            } else {
                await dispatch(createCustomer(customerData));
            }
            onSave(); // Callback to parent after saving the customer
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Name</label>
                <Input
                    type="text"
                    placeholder="Enter customer name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Field>

            <Form.Field>
                <label>Address</label>
                <Input
                    type="text"
                    placeholder="Enter customer address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </Form.Field>

            <Button primary type="submit">
                {customer ? 'Update Customer' : 'Create Customer'}
            </Button>
        </Form>
    );
};

export default CustomerForm;
