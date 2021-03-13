import React from "react";
import { Navbar } from "react-bootstrap";
export default function Header() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand>Parking Lot</Navbar.Brand>
            </Navbar>
        </>
    )
}