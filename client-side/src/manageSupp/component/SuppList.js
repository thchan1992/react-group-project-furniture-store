import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import EditSupp from "./EditSupp";

const SuppList = ({ suppList, setIsLoading }) => {
  return (
    <Row gutter={40}>
      {suppList.map((data) => (
        <Col
          className="block-example border border-dark"
          xs={{ span: 6 }}
          sm={{ span: 4 }}
          md={{ span: 3 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
        >
          <EditSupp data={data} setIsLoading={setIsLoading} />
        </Col>
      ))}
    </Row>
  );
};
export default SuppList;
