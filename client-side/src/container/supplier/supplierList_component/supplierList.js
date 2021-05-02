import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import EditSupplier from "./editSupplier";
import Card from "react-bootstrap/Card";

const SuppList = ({ suppList, setIsLoading, messageSetter }) => {
  return (
    <Row
      gutter={40}
      style={{
        backgroundColor: "white",
      }}
    >
      {suppList.map((data) => (
        <Col
          className="border-0 border-dark"
          xs={{ span: 6 }}
          sm={{ span: 4 }}
          md={{ span: 3 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
        >
          <Card>
            {" "}
            <EditSupplier
              data={data}
              setIsLoading={setIsLoading}
              messageSetter={messageSetter}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default SuppList;
