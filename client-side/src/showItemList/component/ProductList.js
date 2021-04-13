import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import ShowItem from "./ShowItem";
import { showItemsAPI, showSearchAPI, showSuppAPI } from "../../Constants";
import axios from "axios";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ProductList = ({ itemList, userID, userType, setIsLoading }) => {
  return (
    <Row gutter={40}>
      {itemList.map((data) => (
        <Col
          className="block-example border border-dark"
          xs={{ span: 6 }}
          sm={{ span: 4 }}
          md={{ span: 3 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
        >
          <div key={data.itemDetID}>
            <ShowItem
              data={data}
              userType={userType}
              setIsLoading={setIsLoading}
              userID={userID}
            />{" "}
          </div>
        </Col>
      ))}
    </Row>
  );
};
export default ProductList;
