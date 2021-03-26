import "./App.css";
import Login from "./User/Login";
import Item from "./Item/Item";
import SignUp from "./User/SignUp";
import AddItem from "./Item/AddItem";
import AdminSignUp from "./User/AdminSignUp";
import { showCaterAPI } from "./Constants";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import React, { useEffect, useState } from "react";
import axios from "axios";

import FormControl from "react-bootstrap/FormControl";

const App = () => {
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [caterList, setCaterList] = useState([]);

  //API call to render the list of catergory from the database
  //This will be shown on the nav bar
  useEffect(() => {
    axios.get(showCaterAPI).then((response) => {
      setCaterList(response.data.result);
    });
  }, []);

  return (
    <div>
      <div>
        {userType == "A" && <h1>Admin Mode | User ID: {userID}</h1>}
        {userType == "C" && <h1>Welcome back | User ID: {userID}</h1>}
      </div>
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Furniture</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {caterList.map((data) => (
                <Nav.Link
                  as={Link}
                  to={"/" + data.itemCatName}
                  key={data.itemCatID}>
                  {data.itemCatName}
                </Nav.Link>
              ))}
              {userType == "A" && (
                <Nav.Link as={Link} to="/AddItem">
                  Add New Item
                </Nav.Link>
              )}
              {userType == "" && (
                <Nav.Link as={Link} to="/SignUp">
                  Sign Up
                </Nav.Link>
              )}
              {userType == "A" && (
                <Nav.Link as={Link} to="/AdminSignUp">
                  Create an Admin Account
                </Nav.Link>
              )}
            </Nav>

            <Form inline>
              <Login
                setUserID={(userID) => setUserID(userID)}
                setUserType={(userType) => setUserType(userType)}
              />
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          {caterList.map((data) => (
            <Route exact path={"/" + data.itemCatName} key={data.itemCatID}>
              <Item itemCatName={data.itemCatName} userType={userType} />
            </Route>
          ))}
          <Route exact path="/AddItem">
            <AddItem userType={userType} />
          </Route>
          <Route exact path="/SignUp">
            <SignUp />
          </Route>
          {userType == "A" && (
            <Route exact path="/AdminSignUp">
              <AdminSignUp />
            </Route>
          )}
          <Route
            render={function () {
              return <p>Page Not found</p>;
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
