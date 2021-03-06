import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DropDown from './DropDown';
import {
	ListItemText,
	ListItemIcon,
	ListItem,
	List
} from '@material-ui/core';
import { Clock } from 'assets/imgs';


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

	render(){
		const { classes } = this.props;
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
					<List>
						{this.props.data.map((row) => 
							<ListItem 
								button
								key={row.key}
								className={
									this.props.selected === row.key
										? 'menu-item-selected-tracking'
										: 'menu-item-tracking'
								}
								onClick={ () => this.props.handleTime(row.key)}
							>
								<ListItemIcon classes={{ root: 'icon-root' }}>
									<img alt=""
										src={Clock}
									/>
								</ListItemIcon>
								<ListItemText 
									primary={row.key}
									classes={{ primary : 'item-text-tracking', root: 'item-text-tracking'}}
								>
								</ListItemText>
							</ListItem>
						)}
					</List>
				</CardActions>
			</Card>
		);
	}
}
export default withStyles(styles, {withTheme : true})(LayoutTime);