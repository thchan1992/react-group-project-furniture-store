import "./App.css";
import Login from "./login/Login";
import { showCaterAPI, addSuppOrderAPI, showOrdHistoryAPI } from "./Constants";
import { BrowserRouter, Link, useParams } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Utility/Search.js";
import Component from "./Utility/Component";
import Header from "./Utility/Header";

const App = () => {
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [caterList, setCaterList] = useState([]);
  const [keyword, setKeyword] = useState("");

  // API call to render the list of catergory from the database
  // This will be shown on the nav bar
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
      <Login
        setUserID={(userID) => setUserID(userID)}
        setUserType={(userType) => setUserType(userType)}
      />
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Furniture</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/*Header*/}
            <Header caterList={caterList} userType={userType}></Header>
            <Form inline>
              {/*Search Bar*/}
              <Nav.Link as={Link} to={"/item/search/" + { keyword }}>
                <Search setKeyword={setKeyword} keyword={keyword} />
              </Nav.Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {/*Router Linking different component and container */}
        <Component
          userType={userType}
          userID={userID}
          keyword={keyword}
          caterList={caterList}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
