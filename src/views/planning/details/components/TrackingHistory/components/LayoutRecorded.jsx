import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Buttons from './SiteListCard';
import Typography from '@material-ui/core/Typography';

const styles = theme =>({
	root: {
		minWidth: 659,
		width: '100%',
		maxHeight: 670,
		minHeight: theme.spacing.unit * 84,
		height: '100%',
		marginRight: theme.spacing.unit *1
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

class LayoutRecorded extends React.Component {
	render(){
		const { classes } = this.props;

		return (
			<Card className={classes.root} variant="outlined">
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
          RECORDED
					</Typography>
				</CardContent>
				<CardActions>
					<Buttons />
				</CardActions>
			</Card>
		);
	}
}

export default withStyles(styles, { withTheme: true })(LayoutRecorded);