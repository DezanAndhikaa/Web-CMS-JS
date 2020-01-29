/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Card.scss';


class Cards extends React.Component {
	// const classes = useStyles();
	
	// const totalData = props.title;
	// console.log('kon....t',totalData);
	handleClick = () =>{
		this.props.renderList(this.props.title);
	}

	render(){
		return (
			// <Card classes={{ root : classes.card}}>
			<Card className="card">
				<CardActionArea onClick={this.handleClick}>
					<CardContent>
						<Typography variant="h5" component="h2">
							{this.props.title}
						</Typography>
						<Typography variant="h5" component="h1">
							{this.props.totalData}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" >Learn More</Button>
					</CardActions>
				</CardActionArea>
			</Card>
		);
	}
}


export default Cards;
