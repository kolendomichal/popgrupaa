import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalMessege = (props) => {
    const [show, setShow] = useState(props.show);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                <Button variant="secondary" onClick={props.onHide}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
}