import React from 'react';
import { Button, Modal, InputBase, Paper } from '@material-ui/core'
import './InputButton.scss'
import InputText from '../InputText/InputText'
import FilterByLifetime from '../FilterByLifetime/FilterByLifetime'
import FilterByPeriodeDate from '../FilterByPeriodeDate/FilterByPeriodeDate'

export default class InputButton extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            isShowModal: false
        }
    }

    isClicked = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    isClosed = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    render(){
        if(this.props.titles === "Input"){
            return(
                <div className="button-rows">
                <Button onClick={this.isClicked} className="btn-assigns">{this.props.titles}</Button>
                    <Modal className="modal-pos" open={this.state.isShowModal} onClose={this.isClosed}>
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
        }else if(this.props.titles === "SO" || this.props.titles === "Part Number" || this.props.titles === "Unit Code" || this.props.titles === "Serial Number"){
            return(
                <div className="button-rows">
                    <Paper className={this.props.className || 'global-search'} elevation={1}>
                        <InputBase className="txt-search" placeholder={this.props.placeholder}/>
                    </Paper>
                </div>
            )
        }else if(this.props.titles === "Lifetime Comp"){
            return(
                <div className="button-rows">
                <Button onClick={this.isClicked} className="btn-assigns-lifetime" style={{justifyContent: "unset"}}>{this.props.titles}</Button>
                    <Modal className="modal-pos" open={this.state.isShowModal} onClose={this.isClosed}>
                        <div>
                            <FilterByLifetime 
                                {...this.props}
                                {...this.state}
                                title={this.props.title} 
                                onClosed={this.isClosed}
                                onStats={this.props.onStats}
                            />
                        </div>
                    </Modal>
                </div>
            )
        }else if (this.props.titles === "Customer" || this.props.titles === "Site" || this.props.titles === "Unit Model"){
            return(    
                <div className="button-rows">
                    <Button onClick={this.isClicked} className="btn-header" style={{justifyContent: "unset"}}>{this.props.titles}</Button>
                </div>
            )
        }else if (this.props.titles === "Component Description"){
            return(
                <div className="button-rows">
                    <Button onClick={this.isClicked} className="btn-header-comp" style={{justifyContent: "unset"}}>{this.props.titles}</Button>
                </div>
            )
        }
        else{
            return(
                <div className="button-rows">
                <Button onClick={this.isClicked} className="btn-assigns-lifetime" style={{justifyContent: "unset"}}>{this.props.titles}</Button>
                    <Modal className="modal-pos" open={this.state.isShowModal} onClose={this.isClosed}>
                        <div>
                            <FilterByPeriodeDate 
                                {...this.props}
                                {...this.state}
                                title={this.props.title} 
                                onClosed={this.isClosed}
                                onStats={this.props.onStats}
                            />
                        </div>
                    </Modal>
                </div>
            )
        }
    }
}