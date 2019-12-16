import React from 'react';
import { Button } from '@material-ui/core';
import './BaseButton.scss';
import DeleteSuccess from '../DeleteConfirmation/DeleteSuccess';
import DeleteButton from '../ActionButton/DeleteButton/DeleteButton';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';

class BaseButton extends React.Component{
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
        return(
            <div className="button-inline">
                <DeleteButton 
                    {...this.props}
                    {...this.state}
                    onClick={this.isClicked}
                />
                <DeleteConfirmation
                    {...this.props}
                    {...this.state}
                    onClose={this.isClosed}
                    openModal={this.state.isShowModal}
                />
                <Button className="btn-download" onClick={this.isClicked}>Download</Button>
                <Button className="btn-approve" onClick={this.isClicked}>Approve</Button>
                {/* <DeleteSuccess
                    {...this.props}
                    {...this.state}
                    onClose={this.isClosed}
                    openModal={this.state.isShowModal}
                /> */}
            </div>
        )
    }
}

export default BaseButton;