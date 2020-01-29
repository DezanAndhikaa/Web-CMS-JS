import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Card.scss'

const styles  = theme => ({
	card: {
		maxWidth: 275,
		minWidth: 275,
		marginTop: 170,
		marginRight: 25,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

class Cards extends React.Component {
	// const classes = useStyles();
	
	// const totalData = props.title;
	// console.log('kon....t',totalData);
	handleClick (){
		// alert('yeah')
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
			// <Card className="card-body" >
			// 	<CardActionArea onClick={this.handleClick}>
			// 		<CardContent>
			// 			<Typography variant="h5" component="h2">
			// 				{this.props.title}
			// 			</Typography>
			// 			<Typography variant="h5" component="h1">
			// 				{this.props.totalData}
			// 			</Typography>
			// 		</CardContent>
			// 	</CardActionArea>
			// </Card>
		);
	}
}

export default Cards;