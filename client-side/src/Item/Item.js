import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Item = ({ itemCatName, userType }) => {
  // To be continued by Habon & Kavya
  return (
    <div>
      {itemCatName} {userType == "A" && <div>edit part</div>}
    </div>
  );
};

export default Item;
