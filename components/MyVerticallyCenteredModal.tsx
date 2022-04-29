import React from "react";
import { Button, Modal } from "react-bootstrap";

interface ModalPropsInterface {
  body?: string;
  onHide: any;
  show: boolean;
  title?: string;
}

export const MyVerticallyCenteredModal = (props: ModalPropsInterface) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};
