import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { deleteMachine } from '../../services/clusterService';

class MachineListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedRowId: undefined};
    }
    onClick = (rowData, h, idx) => {
        this.setState((state) => ({...state, selectedRowId: idx}));
        if(h.onClick) {
            h.onClick(rowData);
        }
    };

    deleteCluster(machine_id){
        deleteMachine(machine_id)
            .then(
                () => {window.location.reload();})
    }

    render() {
        const {data, headers} = this.props;
        return (
            <Table bordered hover responsive>
                <thead>
                <tr>
                    {headers.map((h, idx) => (
                        <th key={idx*5}>{h.name}</th>
                    ))}
                    <th style={{width: "5%"}} />
                </tr>
                </thead>
                <tbody style={{overflowY: 'auto'}}>
                {data.map((d, idx) => (
                    <tr key={idx}>
                        {headers.map((h, idy) => (
                            <td key={idy} onClick={() => this.onClick(d, h, idx)}>{d[h.field]}</td>
                        ))}
                        <td>
                            <Button variant="danger" 
                                    onClick={() => {
                                            this.deleteCluster(d.id)
                                        }}>
                                        Delete
                            </Button> 
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }
}

export default MachineListTable;