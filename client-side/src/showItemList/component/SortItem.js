import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Sort = ({ setColumn, setSorting, setIsLoading }) => {
  return (
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
        Item Name (A to Z)
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
        Item Name (Z to A)
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
      <Dropdown.Item
        className="text-style-item-upperCase"
        eventKey="Name"
        onClick={() => {
          setColumn("suppName");
          setSorting("ASC");
          setIsLoading(true);
        }}
      >
        Supplier Name (A to Z)
      </Dropdown.Item>
      <Dropdown.Item
        className="text-style-item-upperCase"
        eventKey="Name"
        onClick={() => {
          setColumn("suppName");
          setSorting("DESC");
          setIsLoading(true);
        }}
      >
        Supplier Name (Z to A)
      </Dropdown.Item>
    </DropdownButton>
  );
};
export default Sort;
