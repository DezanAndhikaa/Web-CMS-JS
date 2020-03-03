import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DropDown from './DropDown';


const styles = theme =>({
	root: {
		minWidth: 237,
		width: '30%',
		minHeight: theme.spacing.unit * 84,
		maxHeight: 670,
		height : '100%',
		marginRight: theme.spacing.unit *1
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 30,
		fontFamily: 'Lato-Bold'
	},
	pos: {
		marginBottom: 12,
	},
});

class LayoutTime extends React.Component {
// 
// export default function LayoutTime() {
	render(){
		const { classes } = this.props; //const { classes, theme } = this.props;
		// const bull = <span className={classes.bullet}>•</span>;

		return (
			<Card className={classes.root} variant="outlined">
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
          			TRACKING HISTORY
					</Typography>
					<div>
						<DropDown />
					</div>
				</CardContent>
				<CardActions>
					{this.props.renderLayoutTime()}
				</CardActions>
			</Card>
		);
	}
}
export default withStyles(styles, {withTheme : true})(LayoutTime);