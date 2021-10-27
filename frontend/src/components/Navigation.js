import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
    Navbar, 
    Collapse, 
    Nav, 
    NavItem, 
    NavbarToggler, 
    NavbarBrand } from 'reactstrap'
import { logout_user } from '../actions/actionUser'

function Navigation({ history }) {

    const [ toggled, setToggled ] = useState(false)
    const { data } = useSelector(state => state.users);
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logout_user())
    }

    return (
        <Navbar color="dark" dark expand="md" sticky="top">
            <NavbarBrand href="/">KSU</NavbarBrand>
            <NavbarToggler onClick={() => setToggled(!toggled)} />
            <Collapse isOpen={toggled} navbar>
                <Nav className="mr-auto" navbar>
                    {
                        data && !data.isLogged  &&
                        <>
                            <NavItem>
                                <Link to="/" className="nav-link">Login</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/register" className="nav-link">Register</Link>
                            </NavItem>
                        </>
                    }
                    {
                        data && data.isLogged &&
                        <>
                            <NavItem>
                                <Link to="/students" className="nav-link">Students</Link>
                            </NavItem>
                            <Link to ="/" onClick = {logout} className="nav-link">Logout</Link>
                        </>
                    }
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Navigation
