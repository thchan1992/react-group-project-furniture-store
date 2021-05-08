import { Link, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import "./navbar.css";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const NavBar = ({
  caterList,
  userType,
  keyword,
  setKeyword,
  userID,
  setItemDetID,
  itemDetID,
}) => {
  const history = useHistory();
  const [searchMet, setSearchMet] = useState("search by name");

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/home">
          <span className="text-myaccount">HOME</span>
        </Link>
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
          )}{" "}
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
                <div className="linkText"> Manage Category</div>
              </NavDropdown.Item>{" "}
              <NavDropdown.Item as={Link} to="/AddItem">
                <div className="linkText"> Add a new Product</div>
              </NavDropdown.Item>
              <NavDropdown.Divider />{" "}
              <NavDropdown.Item as={Link} to="/Supplier">
                <div className="linkText"> Manage Supplier</div>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/SuppOrderList">
                <div className="linkText"> Supplier Order List</div>
              </NavDropdown.Item>
              <NavDropdown.Divider />{" "}
              <NavDropdown.Item as={Link} to="/Sales">
                <div className="linkText"> Sales Transaction Details</div>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/SalesSummary">
                <div className="linkText"> Sales Summary Report</div>
              </NavDropdown.Item>
              <NavDropdown.Divider />{" "}
              <NavDropdown.Item as={Link} to="/SignUp">
                <div className="linkText"> Create an Admin Account</div>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/ShowUser/" + userID}>
                <div className="linkText">Manage Account</div>
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {/*Search Bar*/}
          {searchMet == "search by name" && (
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
          )}
          {searchMet == "search by ID" && userType == "A" && (
            <div>
              {" "}
              <FormControl
                type="text"
                placeholder="Search Products"
                className="placeholder-style-search"
                value={itemDetID}
                name="itemDetID"
                onChange={(e) => {
                  setItemDetID(e.target.value);
                }}
              />{" "}
              <Button
                className="placeholder-style-search"
                variant="info"
                onClick={() => {
                  history.push("/Item_detail/" + itemDetID);
                  window.location.reload();
                }}
              >
                Press to search
              </Button>
            </div>
          )}
          {userType == "A" && (
            <DropdownButton
              alignRight
              variant="light"
              title={<h7 className="search-met-style-search">{searchMet}</h7>}
            >
              {" "}
              <Dropdown.Item
                className="sort-text-style"
                eventKey="Name"
                onClick={() => {
                  setSearchMet("search by name");
                }}
              >
                search by name
              </Dropdown.Item>{" "}
              <Dropdown.Item
                className="sort-text-style"
                eventKey="ID"
                onClick={() => {
                  setSearchMet("search by ID");
                }}
              >
                search by ID
              </Dropdown.Item>
            </DropdownButton>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
