import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { createStore, updateStore } from '../redux/storeSlice';

const StoreForm = ({ store, onSave }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (store) {
            setName(store.name);
            setAddress(store.address);
        }
    }, [store]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const storeData = { name, address };

        try {
            if (store) {
                await dispatch(updateStore({ ...storeData, id: store.id }));
            } else {
                await dispatch(createStore(storeData));
            }
            onSave();
        } catch (error) {
            console.error('Error saving store:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field required>
                <label>Name</label>
                <Form.Input
                    placeholder="Enter store name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Field>

            <Form.Field required>
                <label>Address</label>
                <Form.Input
                    placeholder="Enter store address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Form.Field>

            <Button type="submit" primary>
                {store ? 'Update Store' : 'Create Store'}
            </Button>
        </Form>
    );
};

export default StoreForm;
