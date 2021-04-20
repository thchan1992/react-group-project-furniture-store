import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { useHistory, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Textbox from "../Utility/Textbox";
import PaymentDet from "./component/PaymentDet";

const Payment = ({ userID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(null);
  const [ship, setShip] = useState(5);
  const [checkRe, setCheckRe] = useState(true);
  const [checkEx, setCheckEx] = useState(false);
  const [userDetail, setUserDetail] = useState("");
  const [paymentDet, setPaymentDet] = useState("");
  const [deliv, setDeliv] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [addr1, setAddr1] = useState(null);
  const [addr2, setAddr2] = useState(null);
  const [city, setCity] = useState(null);
  const [postcode, setPostcode] = useState(null);
  const history = useHistory();

  const handleCheckout = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    const orderDate = (yyyy + "-" + mm + "-" + dd).toString();

    const shipDate = new Date(today);
    shipDate.setDate(shipDate.getDate() + ship);
    var dd1 = String(shipDate.getDate()).padStart(2, "0");
    var mm1 = String(shipDate.getMonth() + 1).padStart(2, "0");
    var yyyy1 = shipDate.getFullYear();
    const deliveryDate = (yyyy1 + "-" + mm1 + "-" + dd1).toString();

    const checkFund = { totalCost, userID };

    await axios
      .post("http://localhost:8080/payment/checkFund", checkFund)
      .then((response) => {
        if (response.data.result == true) {
          axios
            .get("http://localhost:8080/payment/checkStock/" + userID)
            .then((response) => {
              if (response.data.result == true) {
                if (addr1 || addr2 || city || postcode) {
                  const delivAddress =
                    addr1 + " " + addr2 + " " + city + " " + postcode;
                  const finalisePay = {
                    userID,
                    deliveryDate,
                    orderDate,
                    delivAddress,
                  };
                  finalisePayAct(finalisePay);
                } else {
                  const delivAddress = deliv;
                  const finalisePay = {
                    userID,
                    deliveryDate,
                    orderDate,
                    delivAddress,
                  };
                  finalisePayAct(finalisePay);
                }
              } else {
                window.alert("Some of the items are out of stock..");
                //redirect the page now
                history.push("/Basket");
              }
            });
        } else {
          window.alert("you dont have enough fund for the checkout");
          history.push("/Basket");
        }
      });
  };

  const finalisePayAct = (finalisePay) => {
    axios
      .put("http://localhost:8080/payment/finalise", finalisePay)
      .then((response) => {
        console.log(response);
        if (response.data.result == true) {
          window.alert(response.data.message);
          history.push("/Basket/Payment/Confirmation");
        } else {
          window.alert(response.data.message);
          history.push("/Basket");
        }
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/payment/getCostAndBaskID/" + userID)
      .then((response) => {
        setTotalCost(response.data.totalCost);
      });
    axios
      .get("http://localhost:8080/account/personalDetails/" + userID)
      .then((response) => {
        setUserDetail(response.data.result);
        setDeliv(response.data.result.userAddress);
      });
    axios
      .get("http://localhost:8080/account/paymentDetails/" + userID)
      .then((response) => {
        setPaymentDet(response.data.result);
      });
  }, [isLoading]);

  return (
    <PaymentDet
      paymentDet={paymentDet}
      userDetail={userDetail}
      deliv={deliv}
      showEdit={showEdit}
      addr1={addr1}
      setAddr1={setAddr1}
      addr2={addr2}
      setAddr2={setAddr2}
      city={city}
      setCity={setCity}
      postcode={postcode}
      setPostcode={setPostcode}
      setShowEdit={setShowEdit}
      checkRe={checkRe}
      setCheckRe={setCheckRe}
      setCheckEx={setCheckEx}
      setShip={setShip}
      checkEx={checkEx}
      handleCheckout={handleCheckout}
    />
  );
};
export default Payment;
