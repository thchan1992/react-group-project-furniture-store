import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AddCat from "./AddCat";
import ShowCat from "./ShowCat";

const Category = () => {
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Modify category">
        <ShowCat />
      </Tab>
      <Tab eventKey="ShowCat" title="Add a new category">
        <AddCat />
      </Tab>
    </Tabs>
  );
};

export default Category;
