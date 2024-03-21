import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const HeaderAdmin = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Admin Dashboard</NavbarBrand>
    </Navbar>
  );
};

export default HeaderAdmin;
