/* eslint-disable react/prop-types */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SearchInput from '../../../../../../components/Searchbar/SearchInput';
import SiteListCard from './SiteListCard';

const styles = theme =>({
	root: {
		minWidth: 274,
		width: '50%',
		maxHeight: 670,
		minHeight: theme.spacing.unit * 84,
		height : '100%',
		marginRight: theme.spacing.unit *1
	},
	content : {
		minWidth: 274,
		width: '100%',
		maxHeight: 670,
		minHeight: theme.spacing.unit * 84,
		height : '100%',
		marginRight: theme.spacing.unit *1,
		overflowY: 'auto'
	},
	search : {
		marginLeft : '-25px',
		marginRight : '10px',
		marginBottom : '10px',
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

class LayoutSite extends React.Component {
	render(){
		const { classes } = this.props;

		return (
			<Card className={classes.root} variant="outlined">
				<CardContent>
					<div className={classes.search}>
						<SearchInput
							{...this.props}
							webInfo="Search"
							handleSearch={this.handleSearch}/>
					</div>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
							SITE
					</Typography>
				</CardContent>
				<Card className={classes.content} variant="outlined">
					<div className="list-container">
						<div className="list-item-notif">
							<div className="listnya">
								<SiteListCard/>
							</div>
						</div>
					</div>
				</Card>
			</Card>
		);
	}
}

export default withStyles(styles, { withTheme: true })(LayoutSite);