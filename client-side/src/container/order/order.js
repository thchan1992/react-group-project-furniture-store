import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getUserOrdAPI_Func } from "../../frame/API";
import Component from "./component/order";
import { useHistory, useParams } from "react-router-dom";

const ViewOrder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const history = useHistory();
  const { userID } = useParams();

  useEffect(() => {
    getUserOrdAPI_Func(userID).then((response) => {
      if (!response.data.result || response.data.auth == false) {
        history.push("/error");
        window.location.reload(false);
      }
      setOrderList(response.data.result);
    });
  }, [isLoading]);
  return <Component orderList={orderList} history={history} />;
};

export default ViewOrder;
