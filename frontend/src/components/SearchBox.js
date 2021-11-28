import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex" inline>
      <Form.Control
        type="search"
        placeholder="Ürün Ara..."
        className="me-2"
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type="submit" variant="outline-warning">
        ARA
      </Button>
    </Form>
  );
};

export default SearchBox;
