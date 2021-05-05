import "./App.css";
import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Containers from "./frame/containers";
import NavBar from "./frame/navbar";
import { showCaterAPI_Func } from "./api/api";
import Header from "./frame/header";
import Message from "./frame/message";

const App = () => {
  const [itemDetID, setItemDetID] = useState(null);
  const [caterList, setCaterList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [messageCont, setMessageCont] = useState({
    text: "",
    theme: "",
  });

  //bootstrap warning setter
  const messageSetter = (text, theme, show) => {
    setMessageCont({
      text: text,
      theme: theme,
    });
    setShowMessage(show);
  };

  //api that gets the list of category for the nav bar
  useEffect(() => {
    showCaterAPI_Func().then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      setCaterList(response.data.result);
    });
  }, []);

  return (
    <div className="back-ground-colour">
      <BrowserRouter>
        <br />
        {/* Header */}
        <Header user={user} setUser={setUser} messageSetter={messageSetter} />
        {/*Nav bar*/}
        <NavBar
          caterList={caterList}
          userType={user.userType}
          keyword={keyword}
          setKeyword={setKeyword}
          userID={user.userID}
          setItemDetID={setItemDetID}
          itemDetID={itemDetID}
        />
        {/* bootstrap warning */}
        <Message
          messageCont={messageCont}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
        />
        {/*Router Linking different component and container */}
        <Containers
          user={user}
          keyword={keyword}
          caterList={caterList}
          messageSetter={messageSetter}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
