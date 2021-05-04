import "./App.css";

import { BrowserRouter, Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import Containers from "./frame/containers";
import NavBar from "./frame/navbar";
import { showCaterAPI_Func } from "./api/api";
import Header from "./frame/header";
import Message from "./Utility/message";

const App = () => {
  const [itemDetID, setItemDetID] = useState(null);
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
        {/* Header */}
        <Header
          userType={user.userType}
          userID={user.userID}
          user={user}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setUserID={setUserID}
          setUserType={setUserType}
          setUser={setUser}
          messageSetter={messageSetter}
        />
        {/*Nav bar*/}
        <NavBar
          messageSetter={messageSetter}
          itemDetID={itemDetID}
          setItemDetID={setItemDetID}
          caterList={caterList}
          userType={user.userType}
          keyword={keyword}
          setKeyword={setKeyword}
          userID={user.userID}
        />
        {/* Message */}
        <Message
          messageCont={messageCont}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
        />
        {/*Router Linking different component and container */}
        <Containers
          user={user}
          isLogin={isLogin}
          userType={user.userType}
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
