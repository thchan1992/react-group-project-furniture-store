import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import NewSupplier from "./newSupplier";
import SupplierList from "./supplierList";

const Supplier = ({ messageSetter }) => {
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
      <Tab
        eventKey="home"
        title={
          <span className="category-tab-button-style"> Modify Supplier</span>
        }
      >
        <SupplierList messageSetter={messageSetter} />
      </Tab>
      <Tab
        eventKey="Supplier"
        title={
          <span className="category-tab-button-style"> Add a Supplier</span>
        }
      >
        <NewSupplier messageSetter={messageSetter} />
      </Tab>
    </Tabs>
  );
};

export default Supplier;
