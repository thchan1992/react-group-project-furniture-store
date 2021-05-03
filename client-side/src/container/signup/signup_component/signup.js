import React from "react";
import SignUpForm from "./signUpForm";
import CardForm from "./cardForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./signup.css";
const Signup = ({
  user,
  setUser,
  userType,
  addr1,
  setAddr1,
  addr2,
  setAddr2,
  city,
  setCity,
  postcode,
  setPostcode,
  userPass,
  setUserPass,
  verPass,
  setVerPass,
  payMetList,
  handleSubmit,
}) => {
  return (
    <Row>
      <Col
        style={{
          backgroundColor: "white",
        }}
      >
        <SignUpForm
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
          handleSubmit={handleSubmit}
        />
      </Col>{" "}
      {userType != "A" && (
        <Col
          style={{
            backgroundColor: "white",
          }}
        >
          <CardForm user={user} setUser={setUser} payMetList={payMetList} />
        </Col>
      )}
    </Row>
  );
};
export default Signup;
