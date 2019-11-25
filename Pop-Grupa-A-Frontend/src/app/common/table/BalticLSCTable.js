import React from 'react';
import Table from 'react-bootstrap/Table';

const BalticLSCTable = ({headers, data}) => {
    return (
        <Table striped bordered hover responsive>
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
                        <td key={d[h.field]}>{d[h.field]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    )
};

export default BalticLSCTable;