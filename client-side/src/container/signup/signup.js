import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { pk } from "../../Utility/setPrimary";
import Component from "./signup_component/signup";
import { useHistory } from "react-router-dom";
import {
  checkExistPayDetAPI_Func,
  fetchPayMetAPI_Func,
  signUpAdminAPI_Func,
  signUpAPIFunc,
} from "../../api/api";

import { authChecker } from "../../Utility/authChecker";

const Signup = ({ userType, messageSetter }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    payMetID: "",
    cardNumber: "",
    expire_Date: "",
    ccv: "",
  });

  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [userPass, setUserPass] = useState("");
  const [verPass, setVerPass] = useState("");
  const [payMetList, setPayMetList] = useState([]);
  const history = useHistory();

  const handleSubmit = () => {
    console.log(user);
    if (
      user.userEmail &&
      user.firstName &&
      user.lastName &&
      addr1 &&
      addr2 &&
      city &&
      postcode &&
      userPass &&
      verPass &&
      user.payMetID &&
      user.cardNumber &&
      user.expire_Date &&
      user.ccv &&
      userType != "A" &&
      user.userEmail.includes("@") &&
      userPass.length >= 6
    ) {
      checkExistPayDetAPI_Func(user.cardNumber).then((response) => {
        if (response.data.result) {
          messageSetter("Credit card already exists", "danger", true);
          return;
        } else {
          handleCreateAcc();
        }
      });
    } else if (
      user.userEmail &&
      user.firstName &&
      user.lastName &&
      userPass &&
      verPass &&
      userType == "A"
    ) {
      handleCreateAdmin();
    } else {
      messageSetter("Make sure all field to be filled", "danger", true);
    }
  };

  const handleCreateAcc = () => {
    if (userPass == verPass) {
      user.userAddress = addr1 + " " + addr2 + " " + city + " " + postcode;
      user.userID = pk();
      user.userType = "C";
      user.userPass = userPass;
      console.log("x", user);
      signUpAPIFunc(user).then((response) => {
        if (!response.data.error) {
          history.push("/Home");
          messageSetter("Please Sign in to shop", "success", true);
        } else {
          messageSetter(response.data.error, "danger", true);
        }
      });
    } else {
      messageSetter("Password verification failed", "danger", true);
    }
  };

  const handleCreateAdmin = () => {
    if (userPass == verPass) {
      user.userID = pk;
      user.userType = "A";
      user.userAddress = "N/A";
      user.userPass = userPass;
      signUpAdminAPI_Func(user).then((response) => {
        authChecker(history, response, false);
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
        }
        if (!response.data.error) {
          history.push("/Home");
          messageSetter(
            "Please sign out and log in the new admin account",
            "success",
            true
          );
        }
      });
    } else {
      messageSetter("Password verification failed", "danger", true);
    }
  };

  useEffect(() => {
    fetchPayMetAPI_Func().then((response) => {
      setPayMetList(response.data.result);
    });
  }, []);

  return (
    <Component
      user={user}
      setUser={setUser}
      userType={userType}
      addr1={addr1}
      setAddr1={setAddr1}
      addr2={addr2}
      setAddr2={setAddr2}
      city={city}
      setCity={setCity}
      postcode={postcode}
      setPostcode={setPostcode}
      userPass={userPass}
      setUserPass={setUserPass}
      verPass={verPass}
      setVerPass={setVerPass}
      payMetList={payMetList}
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;
