import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { signUpAPI, signUpAdminAPI } from "../Constants";
import { pk } from "../setPrimary";
import SignUpForm from "./container/SignUpForm";

const SignUp = ({ userType }) => {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [userPass, setUserPass] = useState("");
  const [verPass, setVerPass] = useState("");
  const [isFin, setIsFin] = useState(false);

  const handleSubmit = () => {
    if (
      userEmail &&
      firstName &&
      lastName &&
      addr1 &&
      addr2 &&
      city &&
      postcode &&
      userPass &&
      verPass &&
      userType != "A"
    ) {
      handleCreateAcc();
    } else if (
      userEmail &&
      firstName &&
      lastName &&
      userPass &&
      verPass &&
      userType == "A"
    ) {
      handleCreateAdmin();
    } else {
      window.alert("Make sure all field to be filled");
    }
  };

  const handleCreateAcc = () => {
    if (userPass == verPass) {
      const userAddress = addr1 + " " + addr2 + " " + city + " " + postcode;
      const userID = pk;
      const userType = "C";
      const newUser = {
        userID,
        userType,
        firstName,
        lastName,
        userEmail,
        userAddress,
        userType,
        userPass,
      };
      axios.post(signUpAPI, newUser).then((response) => {
        if (!response.data.error) {
          setIsFin(true);
          window.alert(response.data.message);
        } else {
          window.alert(response.data.error);
        }
      });
    } else {
      window.alert("Password verification failed");
    }
  };

  const handleCreateAdmin = () => {
    if (userPass == verPass) {
      const userID = pk;
      const userType = "A";
      const userAddress = "N/A";
      const newUser = {
        userID,
        userType,
        firstName,
        lastName,
        userEmail,
        userAddress,
        userType,
        userPass,
      };
      axios
        .post(signUpAdminAPI, newUser, {
          //with the JWT - ignore
          headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((response) => {
          if (!response.data.error) {
            setIsFin(true);
            window.alert(response.data.message);
          } else {
            window.alert(response.data.error);
          }
        });
    } else {
      window.alert("Password verification failed");
    }
  };

  return (
    <div>
      {isFin == true && <h1>Registration Finished, please log in</h1>}
      {isFin == false && (
        <div>
          <SignUpForm
            userType={userType}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
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
          />

          <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
