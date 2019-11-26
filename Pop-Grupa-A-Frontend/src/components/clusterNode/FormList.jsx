import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
class DynamicFormList extends React.Component {

    constructor() {
        super();
        this.state = {
            isPrivate: false,
            IPTable: [{ machine: "" }]
        };
    }

    handlePrivateChange = evt => {
        console.log(evt.target.checked)
        this.setState({ isPrivate: evt.target.checked });
    };

    handleMachineIPChange = idx => evt => {
        const newIPTable = this.state.IPTable.map((IP, sidx) => {
            if (idx !== sidx) return IP;
            return { ...IP, machine: evt.target.value };
        });

        this.setState({ IPTable: newIPTable });
    };

    handleSubmit = evt => {
        const { isPrivate, IPTable } = this.state;
        alert(`Incorporated: ${isPrivate} with ${IPTable.length} IPTable`);
    };

    handleAddIP = () => {
        this.setState({
            IPTable: this.state.IPTable.concat([{ machine: "" }])
        });
    };

    handleRemoveIP = idx => () => {
        this.setState({
            IPTable: this.state.IPTable.filter((s, sidx) => idx !== sidx)
        });
    };

    render() {
        return (
            <Row>
                <Form onSubmit={this.handleSubmit}>

                    <h4>Create new Cluster Node</h4>

                    <hr></hr>

                    {this.state.IPTable.map((IP, idx) => (
                        <div className="IP">
                            <input
                                type="text"
                                placeholder={`machine #${idx + 1} IP`}
                                value={IP.machine}
                                onChange={this.handleMachineIPChange(idx)}
                            />
                            <button
                                type="button"
                                onClick={this.handleRemoveIP(idx)}
                                className="small"
                            >
                                -
              </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={this.handleAddIP}
                        className="small"
                    >
                        Add Next IP
          </button>
                    <br />
                    Is Cluster Private:
          <input type="checkbox" name="private" value={this.state.isPrivate} onChange={this.handlePrivateChange} />
                    <br></br>

                    <button>Create</button>
                </Form>
            </Row>
        );
    }
}

export default DynamicFormList;