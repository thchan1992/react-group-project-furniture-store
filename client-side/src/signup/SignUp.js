import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { pk } from "../setPrimary";
import SignUpForm from "./container/SignUpForm";
import CredForm from "./container/CredForm";
import { signUpAPIFunc } from "../Utility/API";
import {
  checkExistPayDetAPI_Func,
  fetchPayMetAPI_Func,
  signUpAdminAPI_Func,
} from "../Utility/API";
import Message from "../Utility/Message";

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
  const [payMetID, setPayMetID] = useState("");
  const [payMetList, setPayMetList] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expire_Date, setExpire_Date] = useState("");
  const [ccv, setCcv] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageCont, setMessageCont] = useState({
    text: "",
    theme: "",
  });

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
      checkExistPayDetAPI_Func(cardNumber).then((response) => {
        console.log("re", response);
        if (response.data.result) {
          messageSetter("Credit card already exists", "danger");
          return;
        } else {
          handleCreateAcc();
        }
      });
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
      messageSetter("Make sure all field to be filled", "danger");
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
        payMetID,
        cardNumber,
        expire_Date,
        ccv,
      };

      // axios.post(signUpAPI, newUser);
      signUpAPIFunc(newUser).then((response) => {
        if (!response.data.error) {
          messageSetter(response.data.message, "success");
          setIsFin(true);
        } else {
          messageSetter(response.data.error, "danger");
        }
      });
    } else {
      messageSetter("Password verification failed", "danger");
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
      signUpAdminAPI_Func(newUser).then((response) => {
        if (!response.data.error) {
          setIsFin(true);
          messageSetter(response.data.message, "success");
        } else {
          messageSetter(response.data.error, "danger");
        }
      });
    } else {
      window.alert("Password verification failed");
    }
  };

  const messageSetter = (text, theme) => {
    setMessageCont({
      text: text,
      theme: theme,
    });
    setShowMessage(true);
  };

  useEffect(() => {
    fetchPayMetAPI_Func().then((response) => {
      setPayMetList(response.data.result);
    });
  }, []);

  return (
    <div>
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
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
          {userType != "A" && (
            <CredForm
              payMetID={payMetID}
              setPayMetID={setPayMetID}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expire_Date={expire_Date}
              setExpire_Date={setExpire_Date}
              ccv={ccv}
              setCcv={setCcv}
              payMetList={payMetList}
            />
          )}

          <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
