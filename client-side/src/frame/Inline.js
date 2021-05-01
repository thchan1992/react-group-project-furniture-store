import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BrowserRouter, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Search from "./Search.js";
import Nav from "react-bootstrap/Nav";
import "./Inline.css";

const Inline = ({ userType, keyword, setKeyword, userID }) => {
  return (
    <Form inline>
      {userType == "" && (
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
          <NavDropdown.Item as={Link} to="/AdminSignUp">
            <h7 className="linkText"> Create an Admin Account</h7>
          </NavDropdown.Item>
        </NavDropdown>
      )}
      {/*Search Bar*/}
      <Nav.Link as={Link} to={"/item/search/" + { keyword }}>
        <Search setKeyword={setKeyword} keyword={keyword} />
      </Nav.Link>
    </Form>
  );
};
export default Inline;
