import React, { Component } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";

export default class Park extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vechNo: "",
            ownerName: "",
            ownerPh: "",
            errmsg: ""
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name } = event.target;
        const value = (event.target.validity.valid) ? event.target.value.toUpperCase() : this.state[name];
        this.setState({ [name]: value, errmsg: "" });
    }

    handleSubmit = () => {
        if (!/^[A-Z]{2}\s[0-9]{2}\s[A-Z]{2}\s[0-9]{4}$/.test(this.state.vechNo)) {
            this.setState({ errmsg: "Please Check Vechile No" });
            return;
        }
        else if (this.state.ownerPh.length !== 10) {
            this.setState({ errmsg: "Please Check Mobile No" });
            return;
        }
        this.props.addVehiceltoLot(this.state);
    }

    render() {
        return (
            <Modal show={this.props.show}
                onHide={this.props.onHide}
                backdrop="static"
                centered
                size="md">
                <Modal.Header closeButton>
                    <Modal.Title>Park</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3"> Lot No </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name={"lotNo"} disabled={true} value={this.props.lot.id} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3"> Vehicle No* </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name={"vechNo"} value={this.state.vechNo} placeholder="AP 20 KA 2021" onChange={this.handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3"> Owner Name </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name={"ownerName"} value={this.state.ownerName} placeholder="Owner Name" onChange={this.handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3"> Mobile No </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" pattern="[0-9]*" name={"ownerPh"} value={this.state.ownerPh} placeholder="9913032021" onChange={this.handleChange} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p style={{ color: "red" }}>{this.state.errmsg}</p>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.props.onHide} onClick={this.handleSubmit} >
                        Park
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}