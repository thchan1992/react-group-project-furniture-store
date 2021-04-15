import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";
import EditCat from "./EditCat";

const CatList = ({ catList, setIsLoading }) => {
  return (
    <Row gutter={40}>
      {catList.map((data) => (
        <Col
          className="block-example border border-dark"
          xs={{ span: 6 }}
          sm={{ span: 4 }}
          md={{ span: 3 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
        >
          <EditCat data={data} setIsLoading={setIsLoading} />
        </Col>
      ))}
    </Row>
  );
};

export default CatList;
