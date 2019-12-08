import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalMessege = (props) => {
    return (
        <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>
                    {props.response.title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.response.message}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}