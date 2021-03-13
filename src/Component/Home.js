import React, { Component } from "react";
import { Container, Col, Row, FormControl, Button, Form } from "react-bootstrap";
import { RiMotorbikeFill, RiCarWashingFill } from "react-icons/ri";
import Park from "./Modals/Park";
import UnPark from "./Modals/UnPark";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lots: {
                car: new Array(15).fill().map((u, index) => ({ id: "C" + (index + 1), isparked: false })),
                bike: new Array(15).fill().map((u, index) => ({ id: "B" + (index + 1), isparked: false }))
            },
            showPark: false,
            showUnPark: false,
            searchVno: "",
            filterType: "all",
        }
        this.lot = {}
    }

    setParkProp = (lot, lottype) => {
        this.lottype = lottype;
        this.lot = lot;
        let modalType = this.lot.vehicel ? "showUnPark" : "showPark";
        this.setState({ [modalType]: true });
    }

    setstateProp = (prop, val) => {
        this.setState({ [prop]: val });
    }

    addVehiceltoLot = (vehicel) => {
        if (!vehicel.vechNo) {
            return;
        }
        let newlLot = [...this.state.lots[this.lottype]];
        newlLot.filter(lot => {
            if (lot.id === this.lot.id) {
                lot.vehicel = { ...vehicel, inTime: new Date().toLocaleString([], { hour12: true }) }
            }
        });
        this.setState({ [this.lottype]: newlLot, showPark: false }, () => {
            newlLot = null
        });
    }

    removeVehicelfromLot = () => {
        this.state.lots[this.lottype].filter(lot => {
            if (lot.id === this.lot.id) {
                delete lot.vehicel
            }
        });
        this.setState({ [this.lottype]: this.state.lots[this.lottype], showUnPark: false });
    }

    getparkingLots = (type) => {
        return (
            <div className="icons" style={{ marginTop: "10px" }}>
                {this.state.lots[type].filter(lot => {
                    if (this.state.filterType === "all") {
                        return true
                    }
                    else if (this.state.filterType === "parked" && lot.vehicel) {
                        return true
                    }
                    else if (this.state.filterType === "free" && !lot.vehicel) {
                        return true
                    }
                }).map((lot, index) => {
                    return (
                        <div className={lot.vehicel ? "item active" : "item"} key={index} onClick={() => { this.setParkProp(lot, type) }}
                            style={{ display: this.state.searchVno ? lot.vehicel && lot.vehicel.vechNo.toUpperCase().includes(this.state.searchVno.toUpperCase()) ? "block" : "none" : "block" }}>
                            <div className="icon h2">
                                {type === "car" ? <RiCarWashingFill /> : <RiMotorbikeFill />}
                            </div>
                            <div className="name">
                                {lot.id}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <>
                <Container>
                    <Row >
                        <Col style={{ marginTop: "10px" }}>
                            <FormControl id={"vechicelSearch"} type="text" placeholder="Vechicel No" className="mr-sm-2" value={this.state.searchVno} onChange={(event) => { this.setState({ "searchVno": event.target.value.toUpperCase() }) }} />
                        </Col>
                        <Col md="auto" style={{ marginTop: "10px" }}>
                                <Button className={this.state.filterType === "all" ? "active" : null} variant="outline-primary" onClick={() => { this.setstateProp("filterType", "all") }}>All</Button>{'  '}
                                <Button className={this.state.filterType === "parked" ? "active" : null} variant="outline-primary" onClick={() => { this.setstateProp("filterType", "parked") }}>Parked</Button>{'  '}
                                <Button className={this.state.filterType === "free" ? "active" : null} variant="outline-primary" onClick={() => { this.setstateProp("filterType", "free") }}>Free</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}>
                            {this.getparkingLots("car")}
                        </Col>
                        <Col sm={5}>
                            {this.getparkingLots("bike")}
                        </Col>
                    </Row>
                </Container>
                { this.state.showPark && <Park show={this.state.showPark} lot={this.lot} onHide={() => { this.setState({ "showPark": false }) }} addVehiceltoLot={(vehicel) => { this.addVehiceltoLot(vehicel) }} />}
                { this.state.showUnPark && <UnPark show={this.state.showUnPark} lot={this.lot} onHide={() => { this.setState({ "showUnPark": false }) }} removeVehicelfromLot={this.removeVehicelfromLot} />}
            </>
        )
    }
}