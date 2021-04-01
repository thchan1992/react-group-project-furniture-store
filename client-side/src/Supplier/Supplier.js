import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AddSup from "./AddSup";
import ShowSup from "./ShowSup";

const Supplier = () => {
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Modify Supplier Detail">
        <ShowSup />
      </Tab>
      <Tab eventKey="ShowCat" title="Add a new Supplier">
        <AddSup />
      </Tab>
    </Tabs>
  );
};

export default Supplier;
