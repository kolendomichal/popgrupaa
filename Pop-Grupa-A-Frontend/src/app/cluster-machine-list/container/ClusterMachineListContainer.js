import React from 'react';
import ClusterMachineList from '../component/ClusterMachineList';
import {connect} from 'react-redux';

const ClusterMachineListContainer = () => {

    return(
        <ClusterMachineList/>
    )
};

export default connect()(ClusterMachineListContainer);