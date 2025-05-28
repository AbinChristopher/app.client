import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import store from './redux/store';
import NavMenu from './Components/navmenu/NavMenu';
import CustomerPage from './pages/CustomerPage';
import StorePage from './pages/StorePage.jsx';
import SalesPage from './pages/SalesPage';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import 'semantic-ui-css/semantic.min.css'; 
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app-container">
                    <NavMenu />

                    <Container className="main-content" style={{ marginTop: '7em' }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/customers" element={<CustomerPage />} />
                            <Route path="/store" element={<StorePage />} />
                            <Route path="/sales" element={<SalesPage />} />
                            <Route path="/products" element={<ProductsPage />} />
                        </Routes>
                    </Container>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
