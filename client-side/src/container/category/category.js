import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import NewCategory from "./newCategory";
import CategoryList from "./categoryList";
import { useHistory } from "react-router-dom";
const Category = ({ messageSetter, userType }) => {
  const history = useHistory();
  //The category tab
  return (
    <div>
      {userType == "A" && (
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab
            eventKey="home"
            title={<span className="category-tab-button-style"> Modify</span>}
          >
            <CategoryList messageSetter={messageSetter} />
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
            <NewCategory messageSetter={messageSetter} />
          </Tab>
        </Tabs>
      )}
      {userType == "C" && <div>{history.push("/error")}</div>}
      {userType == null && <div>{history.push("/error")}</div>}
    </div>
  );
};

export default Category;
