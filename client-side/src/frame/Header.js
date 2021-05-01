import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import React from "react";
import "./Header.css";

const Header = ({ caterList }) => {
  return (
    <Nav className="mr-auto">
      {caterList.map((data) => (
        <Nav.Link
          as={Link}
          to={"/item/" + data.itemCatName}
          key={data.itemCatID}
        >
          <h7 className="linkText">{data.itemCatName}</h7>
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Header;
