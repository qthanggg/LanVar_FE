import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const SidebarAdmin = () => {
  return (
    <Nav vertical>
      <NavItem>
        <NavLink href="#">Dashboard</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Users</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Products</NavLink>
      </NavItem>
    </Nav>
  );
};

export default SidebarAdmin;
