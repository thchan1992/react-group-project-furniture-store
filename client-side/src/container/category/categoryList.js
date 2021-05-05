import React, { useEffect, useState } from "react";
import { showCaterAPI_Func } from "../../api/api";
import Component from "./categoryList_component/categoryList";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";

const CategoryList = ({ messageSetter }) => {
  const [catList, setCatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    //Api to show the category list before the rendering
    showCaterAPI_Func().then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, true);
      setCatList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <Component
      catList={catList}
      setIsLoading={setIsLoading}
      messageSetter={messageSetter}
    />
  );
};

export default CategoryList;
