import React from "react";
import { Form } from "react-bootstrap";

const EntryForm = ({
  type,
  name,
  nameTR,
  placeholderTR,
  onChange,
  ...rest
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{nameTR}</Form.Label>
      <Form.Control
        {...rest}
        type={type}
        value={name}
        placeholder={placeholderTR}
        onChange={onChange}
      ></Form.Control>
    </Form.Group>
  );
};

export default EntryForm;
