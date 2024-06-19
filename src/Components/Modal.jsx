import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DocModal = ({ show, handleClose, documentContent }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Document Viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          src={documentContent}
          width="100%"
          height="500px"
          frameBorder="0"
          title="Document Viewer"
        ></iframe>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocModal;

