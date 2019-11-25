import React from 'react';
import {connect} from 'react-redux';
import MachineList from '../component/MachineList';

const MachineListContainer = () => {

    return (
        <MachineList/>
    )
};

export default connect()(MachineListContainer)
