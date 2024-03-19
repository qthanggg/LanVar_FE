import React, { useState } from "react";
import {
  Button,
  Collapse,
  Container,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/app/feature/account/AccountSlice";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "../Avatar/Avatar";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const carts = useSelector((state) => state.cart.carts);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const gotoCartPage = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div className="header">
      <Container>
        <Navbar expand="xl" light>
          <NavbarBrand href="/">
            <img
              src="/img/LanVar.png"
              style={{ width: "120px", height: "120px" }}
              alt="Logo"
            />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto me-auto nav nav-justified" navbar>
              <NavItem>
                <NavLink to="/home" className="nav-link">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/shop" className="nav-link">
                  Shop
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/auction" className="nav-link">
                  Auction
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/contact" className="nav-link">
                  Contact
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="d-flex align-items-center Header__actions">
              <NavItem className="header__actions__search">
                <FontAwesomeIcon icon={faSearch} />
              </NavItem>
              <NavItem className="header__actions__cart" onClick={gotoCartPage}>
                <FontAwesomeIcon icon={faShoppingCart} />{" "}
                {Object.keys(carts).length}
              </NavItem>
              <NavItem className="header__actions__buy">
                <Button color="primary" outline>
                  Buy Now
                </Button>
              </NavItem>
              {accountLoggedIn.username ? (
                <NavItem className="header__actions__user">
                  <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle
                      tag="div"
                      className="d-flex align-items-center"
                    >
                      <Avatar
                        imageURL="img/user.png"
                        name={accountLoggedIn.username}
                      />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              ) : (
                <NavItem>
                  <Button
                    color="primary"
                    outline
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
};
