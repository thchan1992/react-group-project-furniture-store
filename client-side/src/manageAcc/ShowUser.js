import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../Constants";
import EditUserForm from "./component/EditUserForm";

const ShowUser = ({ userID }) => {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPass, setUserPass] = useState("");
  const [verPass, setVerPass] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [column, setCol] = useState("");
  const [change, setChange] = useState("");
  const [user, setUser] = useState({});
  const [showEd, setShowEd] = useState(false);

  const updateUser = () => {
    console.log(firstName, column, change);
    if (column && change) {
      if (verPass != userPass) {
        window.alert("password verification failed");
        return;
      }
      const userID = user.userID;
      const newData = { userID, change, column };
      console.log(newData);
      axios
        .put(host + "/account/personalDetails/edit", newData)
        .then((response) => {
          window.alert(response.data.message);
          setIsLoading(true);
          setUserEmail("");
          setFirstName("");
          setLastName("");
          setUserAddress("");
          setUserPass("");
          setVerPass("");
          setCol("");
          setChange("");
        });
    } else {
      window.alert("not enough data is inserted");
    }
  };

  useEffect(() => {
    //remove it later
    axios.get(host + "/account/personalDetails/" + userID).then((response) => {
      setUser(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <EditUserForm
      user={user}
      showEd={showEd}
      firstName={firstName}
      setFirstName={setFirstName}
      setCol={setCol}
      setChange={setChange}
      updateUser={updateUser}
      lastName={lastName}
      setLastName={setLastName}
      userEmail={userEmail}
      setUserEmail={setUserEmail}
      userAddress={userAddress}
      setUserAddress={setUserAddress}
      userPass={userPass}
      setUserPass={setUserPass}
      verPass={verPass}
      setVerPass={setVerPass}
      setShowEd={setShowEd}
    />
  );
};

export default ShowUser;
