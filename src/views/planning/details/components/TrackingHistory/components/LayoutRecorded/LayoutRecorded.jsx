import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Woman, Text1, Text2 } from 'assets/imgs';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './LayoutRecorded.scss';

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
					<img className="mid-woman" src={process.env.PUBLIC_URL +Woman} alt=""/>
					<img className="text-1-tracking" alt="" src={process.env.PUBLIC_URL +Text1}/>
					<img className="text-2-tracking" alt="" src={process.env.PUBLIC_URL +Text2}/>
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles, { withTheme: true })(LayoutRecorded);