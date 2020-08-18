import React from 'react';
import { Button, Modal, InputBase, Paper } from '@material-ui/core'
import './InputButton.scss'
import InputText from '../InputText/InputText'
import FilterByLifetime from '../FilterByLifetime/FilterByLifetime'
import FilterByPeriodeDate from '../FilterByPeriodeDate/FilterByPeriodeDate'

export default class InputButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            value: '',
        }
    }

    isClicked = () => {
        this.setState({ isShowModal: !this.state.isShowModal })
    }

    isClosed = () => {
        this.setState({ isShowModal: !this.state.isShowModal })
    }

    handleKeyUp = (event, sort) => {
        this.setState({ value: event.target.value });
        setTimeout(() => {
            this.props.onSearch(this.state.value, sort)
        }, 1000);
    }

    render() {
        if (this.props.titles === "Input") {
            return (
                <div className="button-rows">
                    <Button onClick={this.isClicked} className="btn-assigns">{this.props.titles}</Button>
                    <Modal className="modal-pos" open={this.state.isShowModal}>
                        <div>
                            <InputText
                                {...this.props}
                                {...this.state}
                                onClosed={this.isClosed}
                            />
                        </div>
                    </Modal>
                </div>
            )
        } else if (this.props.titles === "Input Status") {
            return (
                <div className="button-rows">
                    <Button disabled className="btn-assigns">Input</Button>
                </div>
            )
        } else if (this.props.titles === "SO" || this.props.titles === "Work Order") {
            return (
                <div className="button-rows">
                    <Paper className={this.props.position === "Status" ? "search-per-column" : "global-search-pk"} elevation={1}>
                        <InputBase type="number" className="txt-search-pk" placeholder={this.props.placeholder} onKeyUp={(e) => { this.handleKeyUp(e, this.props.sort) }} />
                    </Paper>
                </div>
            )
        } else if (this.props.titles === "Serial Number") {
            return (
                <div className="button-rows">
                    <Paper className={this.props.className || 'global-search-sn'} elevation={1}>
                        <InputBase type="number" className="txt-search" placeholder={this.props.placeholder} onKeyUp={(e) => { this.handleKeyUp(e, this.props.sort) }} />
                    </Paper>
                </div>
            )
        } else if (this.props.titles === "Part Number") {
            return (
                <div className="button-rows">
                    <Paper className={this.props.className || 'global-search-pn'} elevation={1}>
                        <InputBase className="txt-search" placeholder={this.props.placeholder} onKeyUp={(e) => { this.handleKeyUp(e, this.props.sort) }} />
                    </Paper>
                </div>
            )
        } else if (this.props.titles === "Unit Code") {
            return (
                <div className="button-rows">
                    <Paper className={this.props.className || 'global-search'} elevation={1}>
                        <InputBase className="txt-search" placeholder={this.props.placeholder} onKeyUp={(e) => { this.handleKeyUp(e, this.props.sort) }} />
                    </Paper>
                </div>
            )
        } else if (this.props.titles === "LIFETIME COMP") {
            return (
                <div className="button-rows">
                    <Button onClick={this.isClicked} className={this.props.idInput === "Data Input" ? "btn-non-filter-lifetime" : "btn-assigns-lifetime"} style={{ justifyContent: "unset" }}>{this.props.titles}</Button>
                    <Modal className="modal-pos" open={this.state.isShowModal}>
                        <div>
                            <FilterByLifetime
                                {...this.props}
                                {...this.state}
                                title={this.props.title}
                                onClosed={this.isClosed}
                            />
                        </div>
                    </Modal>
                </div>
            )
        } else if (this.props.titles === "SMR") {
            return (
                <div className="button-rows">
                    <Button onClick={this.isClicked} className="btn-filter-smr" style={{ justifyContent: "unset" }}>{this.props.titles}</Button>
                    <Modal className="modal-pos" open={this.state.isShowModal}>
                        <div>
                            <FilterByLifetime
                                {...this.props}
                                {...this.state}
                                title={this.props.title}
                                onClosed={this.isClosed}
                            />
                        </div>
                    </Modal>
                </div>
            )
        } else if (this.props.titles === "Site" || this.props.titles === "Unit Model") {
            return (
                <div className="button-rows">
                    <Button onClick={this.isClicked} className="btn-header" style={{ justifyContent: "unset" }}>{this.props.titles}</Button>
                </div>
            )
        } else if (this.props.titles === "Customer" || this.props.titles === "Component Description") {
            return (
                <div className="button-rows">
                    <Button onClick={this.isClicked} className="btn-header-comp" style={{ justifyContent: "unset" }}>{this.props.titles}</Button>
                </div>
            )
        } else if (this.props.titles === "NF Lifetime") {
            return (
                <div className="button-rows">
                    {this.props.headerName}
                </div>
            )
        }
        else if (this.props.titles === "SMR DATE") {
            return (
                <div className="button-rows">
                    <Button onClick={this.isClicked} className="btn-smr-date" style={{ justifyContent: "unset" }}>{this.props.titles}</Button>
                    <Modal className="modal-pos" open={this.state.isShowModal}>
                        <div>
                            <FilterByPeriodeDate
                                {...this.props}
                                {...this.state}
                                kluk={"kluk"}
                                title={this.props.title}
                                onClosed={this.isClosed}
                            />
                        </div>
                    </Modal>
                </div>
            )
        }
        else {
            return (
                <div className="button-rows">
                    <Button onClick={this.isClicked} className="btn-filter-by-date" style={{ justifyContent: "unset" }}>{this.props.titles}</Button>
                    <Modal className="modal-pos" open={this.state.isShowModal}>
                        <div>
                            <FilterByPeriodeDate
                                {...this.props}
                                {...this.state}
                                kluk={"kluk"}
                                title={this.props.title}
                                onClosed={this.isClosed}
                            />
                        </div>
                    </Modal>
                </div>
            )
        }
    }
}