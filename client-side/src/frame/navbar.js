import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import "./navbar.css";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
const Header = ({ caterList, userType, keyword, setKeyword, userID }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/home">🪧</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {caterList.map((data) => (
            <Nav.Link
              as={Link}
              to={"/item/" + data.itemCatName}
              key={data.itemCatID}
            >
              <h7 className="linkText">{data.itemCatName}</h7>
            </Nav.Link>
          ))}
        </Nav>
        <Form inline>
          {userType == null && (
            <Nav.Link as={Link} to="/SignUp">
              <h7 className="text-myaccount">Sign Up</h7>
            </Nav.Link>
          )}
          {userType == "C" && (
            <NavDropdown
              alignRight
              title={<span className="text-myaccount">My Account</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to={"/User/Order/" + userID}>
                <h7 className="linkText">Order History</h7>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/ShowUser/" + userID}>
                <h7 className="linkText">Manage Account</h7>
              </NavDropdown.Item>
            </NavDropdown>
          )}

          {userType == "A" && (
            <NavDropdown
              alignRight
              title={<span className="text-myaccount">Admin Option</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to={"/ShowUser/" + userID}>
                <h7 className="linkText">Manage Account</h7>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Category">
                <h7 className="linkText"> Manage Category</h7>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Supplier">
                <h7 className="linkText"> Manage Supplier</h7>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/SuppOrderList">
                <h7 className="linkText"> Supplier Order List</h7>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Sales">
                <h7 className="linkText"> Sales Report</h7>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/SalesSummary">
                <h7 className="linkText"> Sales Summary Report</h7>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/AddItem">
                <h7 className="linkText"> Add a new Product</h7>
              </NavDropdown.Item>
              <NavDropdown.Divider />{" "}
              <NavDropdown.Item as={Link} to="/SignUp">
                <h7 className="linkText"> Create an Admin Account</h7>
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {/*Search Bar*/}
          <Nav.Link as={Link} to={"/item/search/" + { keyword }}>
            <FormControl
              type="text"
              placeholder="Search Products"
              className="placeholder-style-search"
              value={keyword}
              name="keyword"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </Nav.Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
