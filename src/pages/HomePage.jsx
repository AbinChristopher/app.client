import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePageStats } from '../redux/homepageSlice';
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const { customers, totalSales, stores, products, loading, error } = useSelector((state) => state.home);


    useEffect(() => {
        dispatch(fetchHomePageStats());
    }, [dispatch]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5">Error: {error}</div>;
    }

    return (
        <div className="homepage container mt-5 fade-in">
            <div className="text-center mb-5">
                <h1 className="display-4 text-primary fw-bold">Business Dashboard</h1>
                <p className="lead text-muted">
                    Monitor performance, manage resources, and keep your business organizedall in one place.
                </p>
            </div>

            <div className="row g-4 text-center mb-5">
                <div className="col-md-3 col-sm-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title text-primary">{customers !== null ? customers : "Loading..."}</h5>
                            <p className="card-text text-muted">Customers</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title text-success">{totalSales !== null ? totalSales : "Loading..."}</h5>
                            <p className="card-text text-muted">Total Sales</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title text-warning">{stores !== null ? stores : "Loading..."}</h5>
                            <p className="card-text text-muted">Stores</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title text-info">{products !== null ? products : "Loading..."}</h5>
                            <p className="card-text text-muted">Products</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <a href="/customers" className="btn btn-outline-primary mx-2 mb-2">Manage Customers</a>
                <a href="/store" className="btn btn-outline-secondary mx-2 mb-2">Store Overview</a>
                <a href="/sales" className="btn btn-outline-success mx-2 mb-2">Sales Dashboard</a>
                <a href="/products" className="btn btn-outline-info mx-2 mb-2">Product List</a>
            </div>
        </div>
    );
}

export default HomePage;
