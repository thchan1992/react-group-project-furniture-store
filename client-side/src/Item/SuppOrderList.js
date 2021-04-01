import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
//import BootstrapTable from "bootstrap-table/dist/bootstrap-table-vue.esm.js";
//import "bootstrap-table/dist/themes/materialize/bootstrap-table-materialize.min.css";

import React, { useEffect, useState } from "react";
//import paginationFactory from "react-bootstrap-table2-paginator";
//import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import {
  showItemsAPI,
  host,
  delImageAPI,
  addItemAPI,
  uploadImageAPI,
  showSearchAPI,
  updateRecDateAPI,
  showOrdHistoryAPI,
  editItemAPI,
  updateStockAPI,
} from "../Constants";
import axios from "axios";

const SuppOrderList = ({ userType }) => {
  const [suppOrdID, setSuppOrdID] = useState("");
  //   const [suppID, setSuppID] = useState("");
  const [itemDetID, setItemDetID] = useState("");
  //   const [itemCatID, setItemCatID] = useState("");
  const [suppOrdQty, setSuppOrdQty] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [ordReceiveDate, setOrdReceiveDate] = useState("");
  const [change, setChange] = useState("");
  const [orderList, setOrderList] = useState([]);
  //   const [itemCatList, setItemCatList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemQty, setItemQty] = useState("");
  //const [newQty, setNewQty] = useState("");

  // const options = {
  //   page: 1,
  //   sizePerPage: 10,
  //   nextPageText: ">",
  //   prePageText: "<",
  //   showTotal: true,
  // };

  const updateDateQty = (suppOrdID, itemDetID, suppOrdQty) => {
    const newData = {
      suppOrdID,
      ordReceiveDate,
      itemDetID,
      suppOrdQty,
    };
    console.log(newData);
    axios.put(updateStockAPI, newData).then((response) => {
      console.log(response.data);
      window.alert(response.data.message);
      setOrdReceiveDate("");
      setItemQty("");
      setIsLoading(true);
    });
  };

  /* // function that updates the changes made to the item.
  const updateQty = (itemQty, itemDetID) => {
    const change = itemQty;
    const column = "itemQty";
    const newData = {
      itemDetID,
      change,
      column,
    };
    axios
      .put(editItemAPI, newData, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        window.alert(response.data.message);
        setItemQty("");
        setIsLoading(true);
      });
  }; */

  //Function to fetch the sorted items
  const fetchOrder = () => {
    axios.post(showOrdHistoryAPI).then((response) => {
      setOrderList(response.data.result);
    });
    //setIsLoading(false);
  };

  useEffect(() => {
    fetchOrder();
    setIsLoading(false);
  }, [isLoading]);

  //Sorting Item by Name (A to Z), Name(Z to A), Price(low to high), Price(high to low).
  //Admin can update any Item's Name, Price, Description, Quantity, Threshold and Image.
  return (
    <div>
      <h1>Supplier Order</h1>{" "}
      {userType == "A" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Supplier Order ID</th>
              <th>Supplier ID</th>
              <th>Item Detail ID</th>
              <th>Item Category ID</th>
              <th>Supplier Order Quantity</th>
              <th>Order Date</th>
              <th>Recieve Date</th>
              <th>Action</th>
            </tr>
          </thead>

          {orderList.map((data) => (
            <tbody key={data.suppOrdID}>
              <tr>
                <td className="text-style-item-upperCase">{data.suppOrdID}</td>
                <td className="text-style-item-upperCase">{data.suppID}</td>
                <td className="text-style-item-upperCase">{data.itemDetID}</td>
                <td className="text-style-item-upperCase">{data.itemCatID}</td>
                <td className="text-style-item-upperCase">{data.suppOrdQty}</td>
                <td className="text-style-item">{data.orderDate}</td>
                <td className="text-style-item">{data.ordReceiveDate}</td>
                <td className="text-style-item">
                  <Form.Control
                    style={{ height: "30px", width: "150px" }}
                    type="text"
                    placeholder="Edit Date"
                    name="ordReceiveDate"
                    id="ordReceiveDate"
                    value={ordReceiveDate}
                    onChange={(e) => {
                      setOrdReceiveDate(e.target.value);
                    }}
                  />
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => {
                      updateDateQty(
                        data.suppOrdID,
                        data.itemDetID,
                        data.suppOrdQty
                      );
                      //updateQty(data.itemDetID, data.suppOrdQty);
                    }}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      )}
    </div>
  );
};

export default SuppOrderList;
