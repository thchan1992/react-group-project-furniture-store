import React, { useEffect, useState } from "react";
import { showCaterAPI_Func } from "../../api/api";
import Component from "./categoryList_component/categoryList";
import { useHistory } from "react-router-dom";

const CategoryList = ({ messageSetter }) => {
  const [catList, setCatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    showCaterAPI_Func().then((response) => {
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
