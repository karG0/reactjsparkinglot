import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

export default function Park(props) {
    return (
        <Modal show={props.show} onHide={props.onHide} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Un Park</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover size="sm">
                    <tbody>
                        <tr>
                            <td>Plot No </td>
                            <td>{props.lot.id}</td>
                        </tr>
                        <tr>
                            <td>vehicle No</td>
                            <td>{props.lot.vehicel.vechNo}</td>
                        </tr>
                        <tr>
                            <td>Owner Name</td>
                            <td>{props.lot.vehicel.ownerName}</td>
                        </tr>
                        <tr>
                            <td>Mobile No</td>
                            <td>{props.lot.vehicel.ownerPh}</td>
                        </tr>
                        <tr>
                            <td>In Time </td>
                            <td>{props.lot.vehicel.inTime}</td>
                        </tr>
                        <tr>
                            <td>Out Time </td>
                            <td>{new Date().toLocaleString([], { hour12: true })}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.removeVehicelfromLot}>
                    UnPark
                </Button>
            </Modal.Footer>
        </Modal>
    );
}