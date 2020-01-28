import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles  = theme => ({
	card: {
		maxWidth: 275,

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

	render(){
		const { classes } = this.props;
		return (
			<Card classes={{ root : classes.card}}>
				<CardContent>
					<Typography variant="h5" component="h2">
						{this.props.title}
					</Typography>
					<Typography variant="h5" component="h1">
						{this.props.totalData}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Learn More</Button>
				</CardActions>
			</Card>
		);
	}
}
Cards.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Cards);