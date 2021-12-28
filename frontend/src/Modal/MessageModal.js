import React from "react";
import Button from '../FormElements/Button'
import { Redirect } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'

const MessageModal = (props) => {
  return (
    <Modal show={!!props.show} onHide={props.onClear} >
        <Modal.Header closeButton>
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClear}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default MessageModal;
