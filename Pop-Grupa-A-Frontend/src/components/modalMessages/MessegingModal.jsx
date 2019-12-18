import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import alertActions from "../../redux/alert/alertActions";

const ModalMessage = ({show, message, title, close}) => {
    return(
        <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {message}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={close}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    show: state.alert.show,
    message: state.alert.message,
    title: state.alert.title
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(alertActions.hideAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage);