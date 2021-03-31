import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import ShowItem from "./ShowItem";
import { showItemsAPI, showSearchAPI } from "../Constants";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Item = ({ itemCatName, userType, keyword }) => {
  const [sorting, setSorting] = useState("ASC");
  const [column, setColumn] = useState("itemName");
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Function to fetch the sorted items
  const fetchItem = () => {
    if (!keyword) {
      axios
        .get(showItemsAPI + sorting + "/" + column + "/" + itemCatName)
        .then((response) => {
          setItemList(response.data.result);
        });
    } else {
      axios
        .get(showSearchAPI + sorting + "/" + column + "/" + keyword)
        .then((response) => {
          setItemList(response.data.result);
        });
      setIsLoading(false);
    }
  };

  //use Effect to fetch item list.
  useEffect(() => {
    fetchItem();
    setIsLoading(false);
  }, [isLoading]);

  //Sorting Item by Name (A to Z), Name(Z to A), Price(low to high), Price(high to low).
  //Admin can update any Item's Name, Price, Description, Quantity, Threshold and Image.
  return (
    <div>
      <DropdownButton variant="warning" title="Sort By">
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Name"
          onClick={() => {
            setColumn("itemName");
            setSorting("ASC");
            setIsLoading(true);
          }}
        >
          Name (A to Z)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Name"
          onClick={() => {
            setColumn("itemName");
            setSorting("DESC");
            setIsLoading(true);
          }}
        >
          Name (Z to A)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Price"
          onClick={() => {
            setColumn("itemPrice");
            setSorting("ASC");
            setIsLoading(true);
          }}
        >
          Price (Low to High)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Price"
          onClick={() => {
            setColumn("itemPrice");
            setSorting("DESC");
            setIsLoading(true);
          }}
        >
          Price (High to Low)
        </Dropdown.Item>
      </DropdownButton>
      <Row gutter={40}>
        <div className="flex-container"></div>
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
              />{" "}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Item;
