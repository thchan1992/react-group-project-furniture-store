import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const SortItem = ({
  setColumn,
  setSorting,
  setIsLoading,
  showSort,
  setShowSort,
}) => {
  return (
    <DropdownButton
      variant="light"
      title={<h7 className="sort-button-style">{showSort}</h7>}
    >
      <Dropdown.Item
        className="sort-text-style"
        eventKey="Name"
        onClick={() => {
          setColumn("itemName");
          setSorting("ASC");
          setIsLoading(true);
          setShowSort("Item Name (A to Z)");
        }}
      >
        Item Name (A to Z)
      </Dropdown.Item>
      <Dropdown.Item
        className="sort-text-style"
        eventKey="Name"
        onClick={() => {
          setColumn("itemName");
          setSorting("DESC");
          setIsLoading(true);
          setShowSort("Item Name (Z to A)");
        }}
      >
        Item Name (Z to A)
      </Dropdown.Item>
      <Dropdown.Item
        className="sort-text-style"
        eventKey="Price"
        onClick={() => {
          setColumn("itemPrice");
          setSorting("ASC");
          setIsLoading(true);
          setShowSort("Price (Low to High)");
        }}
      >
        Price (Low to High)
      </Dropdown.Item>
      <Dropdown.Item
        className="sort-text-style"
        eventKey="Price"
        onClick={() => {
          setColumn("itemPrice");
          setSorting("DESC");
          setIsLoading(true);
          setShowSort("Price (High to Low)");
        }}
      >
        Price (High to Low)
      </Dropdown.Item>
      <Dropdown.Item
        className="sort-text-style"
        eventKey="Name"
        onClick={() => {
          setColumn("suppName");
          setSorting("ASC");
          setIsLoading(true);
          setShowSort("Supplier Name (A to Z)");
        }}
      >
        Supplier Name (A to Z)
      </Dropdown.Item>
      <Dropdown.Item
        className="sort-text-style"
        eventKey="Name"
        onClick={() => {
          setColumn("suppName");
          setSorting("DESC");
          setIsLoading(true);
          setShowSort("Supplier Name (Z to A)");
        }}
      >
        Supplier Name (Z to A)
      </Dropdown.Item>
    </DropdownButton>
  );
};
export default SortItem;
