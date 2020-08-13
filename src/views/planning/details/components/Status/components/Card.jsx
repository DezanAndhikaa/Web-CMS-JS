/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import './Card.scss'

class Cards extends React.Component {
	handleClick = () =>{
		this.props.renderList(this.props.title);
	}

	render(){
		return (
		<div className="card-container">
			<Button className={this.props.title === "Approve" ? "card-approve" : 
			this.props.title === "Not Approve" ? "card-not-approve" :
			this.props.title === "Delete" ? "card-delete" : "card-SAP" } onClick={this.handleClick} >
				<div className="card-title">
					{this.props.title}
				</div>
				<div className="card-data">
					{this.props.totalData}
				</div>
			</Button>
		</div>
		);
	}
}

export default Cards;