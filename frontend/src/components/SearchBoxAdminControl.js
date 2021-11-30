import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBoxAdminControl = ({ history, pageName, tagname }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/admin/${pageName}/search/${keyword}`);
    } else {
      history.push(`/admin/${pageName}`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="search"
        placeholder={tagname}
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

export default SearchBoxAdminControl;
