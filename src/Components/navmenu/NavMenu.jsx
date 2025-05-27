import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
    return (
        <div className="navbar">
            <Container className="navbar-container">
                <Menu secondary>
                    <Menu.Item as={NavLink} to="/" exact className="navlink">
                        Home
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/customers" className="navlink">
                        Customers
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/store" className="navlink">
                        Stores
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/sales" className="navlink">
                        Sales
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/products" className="navlink">
                        Products
                    </Menu.Item>
                </Menu>
            </Container>
        </div>
    );
};

export default NavMenu;
