import React from 'react';
import { Button, Modal } from '@material-ui/core'
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
        }else{
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