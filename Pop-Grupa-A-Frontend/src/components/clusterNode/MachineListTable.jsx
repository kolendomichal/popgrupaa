import React from 'react';
import Table from 'react-bootstrap/Table';

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

    render() {
        const {data, headers} = this.props;
        return (
            <Table bordered hover responsive>
                <thead>
                <tr>
                    {headers.map((h, idx) => (
                        <th key={idx*5}>{h.name}</th>
                    ))}
                </tr>
                </thead>
                <tbody style={{overflowY: 'auto'}}>
                {data.map((d, idx) => (
                    <tr key={idx}>
                        {headers.map((h, idy) => (
                            <td key={idy} onClick={() => this.onClick(d, h, idx)}>{d[h.field]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }
}

export default MachineListTable;