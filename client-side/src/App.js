import "./App.css";
import Login from "./container/login/login";
import { BrowserRouter, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import React, { useEffect, useState } from "react";
import Component from "./frame/Component";
import Header from "./frame/Header";
import { showCaterAPI_Func } from "./frame/API";
import Inline from "./frame/Inline";
import Message from "./frame/Message";

const App = () => {
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [caterList, setCaterList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageCont, setMessageCont] = useState({
    text: "",
    theme: "",
  });

  const messageSetter = (text, theme, show) => {
    setMessageCont({
      text: text,
      theme: theme,
    });
    setShowMessage(show);
  };

  useEffect(() => {
    showCaterAPI_Func().then((response) => {
      setCaterList(response.data.result);
    });
  }, []);

  return (
    <div className="back-ground-colour">
      <BrowserRouter>
        <br />
        {/* The website banner */}
        <div className="footer">
          <h1 className="titleText">CHKMV Furniture</h1>
          <div className={"right"}>
            {userType == "A" && (
              <h4 className="titleText">Admin Mode | User ID: {userID}</h4>
            )}
            {userType == "C" && (
              <h4 className="titleText">Welcome back, {user.firstName}!</h4>
            )}
            {/* The website log in component */}
            <Login
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              userID={userID}
              setUserID={(userID) => setUserID(userID)}
              setUserType={(userType) => setUserType(userType)}
              userType={userType}
              setUser={setUser}
              messageSetter={messageSetter}
            />
          </div>
        </div>
        {/* Message */}
        <Message
          messageCont={messageCont}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
        />
        {/* Header */}
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <Link to="/home">🪧</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/*Header*/}
            <Header caterList={caterList} userType={userType} />
            <Inline
              setKeyword={setKeyword}
              userType={userType}
              keyword={keyword}
              userID={userID}
            />
          </Navbar.Collapse>
        </Navbar>

        {/*Router Linking different component and container */}
        <Component
          isLogin={isLogin}
          userType={userType}
          userID={userID}
          keyword={keyword}
          caterList={caterList}
          messageSetter={messageSetter}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
