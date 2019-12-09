import React from 'react';
import {connect} from 'react-redux';
import alertActions from './duck/alertActions';
import Alert from 'react-bootstrap/Alert';
import {StyledAlert} from './StyledAlert';

const AlertComponent = ({message, show, close}) => {
    if (show) {
        return (
            <StyledAlert>
                <Alert variant="danger" onClose={close} dismissible>
                    <Alert.Heading>Alert</Alert.Heading>
                    <p>
                        {message}
                    </p>
                </Alert>
            </StyledAlert>
        );
    } else {
        return null;
    }
};

const mapStateToProps = (state) => ({
    show: state.alert.show,
    message: state.alert.message
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(alertActions.hideAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertComponent);