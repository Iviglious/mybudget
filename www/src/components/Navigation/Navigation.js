import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import './Navigation.css';
import { Navbar, Nav, NavbarToggler, Collapse, NavbarBrand, NavLink, NavItem } from 'reactstrap';
import { withRouter } from "react-router";

import config from '../../config';

const Navigation = props => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return(
    <>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">MyBudget</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/" onClick={() => (props.history.push('/'))} >Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/balance"  onClick={() => (props.history.push('/balance'))} >Balance</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/transactions"  onClick={() => (props.history.push('/transactions'))} >Transactions</NavLink>
                    </NavItem>
                </Nav>
                <Nav>
                    <NavItem>
                        <NavLink href={`https://${config.cognito_hosted_domain}/login?response_type=token&client_id=${config.aws_user_pools_web_client_id}&redirect_uri=${config.redirect_url}`}
                         onClick={() => (props.history.push(`https://${config.cognito_hosted_domain}/login?response_type=token&client_id=${config.aws_user_pools_web_client_id}&redirect_uri=${config.redirect_url}`))} >Login</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    </>);
};

const NavigationWithRouter = withRouter(Navigation);
export default NavigationWithRouter;