import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AddCat from "./newCategory";
import ShowCat from "./categoryList";

const Category = ({ messageSetter }) => {
  return (
    <div>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab
          eventKey="home"
          title={<span className="category-tab-button-style"> Modify</span>}
        >
          <ShowCat messageSetter={messageSetter} />
        </Tab>
        <Tab
          eventKey="ShowCat"
          title={
            <span className="category-tab-button-style">
              {" "}
              Add a new Category
            </span>
          }
        >
          <AddCat messageSetter={messageSetter} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Category;
