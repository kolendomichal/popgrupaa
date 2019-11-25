import React from 'react';
import Table from 'react-bootstrap/Table';

class BalticLSCTable extends React.Component {
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
                    {headers.map(h => (
                        <th key={h.name}>{h.name}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((d, idx) => (
                    <tr key={idx}>
                        {headers.map(h => (
                            <td key={d[h.field]} onClick={() => this.onClick(d, h, idx)}>{d[h.field]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }
}

export default BalticLSCTable;