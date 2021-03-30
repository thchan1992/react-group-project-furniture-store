import "./App.css";
import Login from "./User/Login";
import Item from "./Item/Item";
import SignUp from "./User/SignUp";
import AddItem from "./Item/AddItem";
import SuppOrderList from "./Item/SuppOrderList";
import AdminSignUp from "./User/AdminSignUp";
import { showCaterAPI, addSuppOrderAPI, showOrdHistoryAPI } from "./Constants";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmailJS from "./Item/EmailJS";

import FormControl from "react-bootstrap/FormControl";

const App = () => {
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [caterList, setCaterList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const itemData = { itemName: "React", itemDetIDs: 1234, itemQty: 5 };

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
                  key={data.itemCatID}
                  onClick={() => {
                    setShowSearch(false);
                  }}>
                  {data.itemCatName}
                </Nav.Link>
              ))}
              {userType == "A" && (
                <Nav.Link
                  as={Link}
                  to="/AddItem"
                  onClick={() => {
                    setShowSearch(false);
                  }}>
                  Add New Item
                </Nav.Link>
              )}
              {userType == "A" && (
                <Nav.Link
                  as={Link}
                  to="/SuppOrderList"
                  onClick={() => {
                    setShowSearch(false);
                  }}>
                  Supplier Order List
                </Nav.Link>
              )}
              {userType == "A" && (
                <Nav.Link
                  as={Link}
                  to="/EmailJS"
                  onClick={() => {
                    setShowSearch(false);
                  }}>
                  Email
                </Nav.Link>
              )}
              {userType == "" && (
                <Nav.Link
                  as={Link}
                  to="/SignUp"
                  onClick={() => {
                    setShowSearch(false);
                  }}>
                  Sign Up
                </Nav.Link>
              )}
              {userType == "A" && (
                <Nav.Link
                  as={Link}
                  to="/AdminSignUp"
                  onClick={() => {
                    setShowSearch(false);
                  }}>
                  Create an Admin Account.
                </Nav.Link>
              )}
            </Nav>

            <Form inline>
              <Login
                setUserID={(userID) => setUserID(userID)}
                setUserType={(userType) => setUserType(userType)}
              />
              {showSearch === true && (
                <FormControl
                  type="text"
                  placeholder="search product name"
                  className="mr-sm-2"
                  value={keyword}
                  name="keyword"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />
              )}
              <Nav.Link as={Link} to={"/" + { keyword }}>
                <Button
                  variant="outline-success"
                  onClick={() => {
                    if (showSearch == false) {
                      setShowSearch(true);
                    } else {
                      setShowSearch(false);
                    }
                  }}>
                  {showSearch === true && <>Hide Search Function</>}
                  {showSearch === false && <>Open Search Function</>}
                </Button>
              </Nav.Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          {caterList.map((data) => (
            <Route exact path={"/" + data.itemCatName} key={data.itemCatID}>
              <Item
                itemCatName={data.itemCatName}
                userType={userType}
                keyword={null}
              />
            </Route>
          ))}
          <Route exact path={"/" + { keyword }}>
            <Item
              itemCatName={null}
              userType={userType}
              keyword={keyword}
              key={new Date().getTime()}
            />
          </Route>
          <Route exact path="/AddItem">
            <AddItem userType={userType} />
          </Route>
          {userType == "A" && (
            <Route exact path="/SuppOrderList">
              <SuppOrderList userType={userType} />
            </Route>
          )}
          {userType == "A" && (
            <Route exact path="/EmailJS">
              <EmailJS userType={userType} itemData={itemData} />
            </Route>
          )}
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
