import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavItem from "react-bootstrap/NavItem";

const Header = ({ userType, caterList }) => {
  return (
    <Nav className="mr-auto">
      {caterList.map((data) => (
        <Nav.Link
          as={Link}
          to={"/item/" + data.itemCatName}
          key={data.itemCatID}
        >
          {data.itemCatName}
        </Nav.Link>
      ))}

      {userType == "" && (
        <Nav.Link as={Link} to="/SignUp">
          Sign Up
        </Nav.Link>
      )}
      {
        <Nav.Link as={Link} to="/ShowUser">
          Manage Account
        </Nav.Link>
      }
      {userType == "C" && (
        <Nav.Link as={Link} to="/Basket">
          Basket
        </Nav.Link>
      )}
      {userType == "A" && (
        <NavDropdown title="Admin Panel" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/Category">
            Manage Category
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/Supplier">
            Manage Supplier
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/AdminSignUp">
            Create an Admin Account
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/SuppOrderList">
            Supplier Order List
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/EmailJS">
            Email
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="/AddItem">
            Add a new Product
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </Nav>
  );
};

export default Header;

//
