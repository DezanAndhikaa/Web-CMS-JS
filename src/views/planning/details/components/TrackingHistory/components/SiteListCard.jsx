import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { IceFace } from 'assets/imgs';
import './SiteListCard.scss';

const styles = theme =>({
	root: {
		minWidth: 274,
		width: '50%',
		maxHeight: 670,
		minHeight: theme.spacing.unit * 84,
		height : '100%',
		marginRight: theme.spacing.unit *1,
	},
	content : {
		width: '100%',
		height : '100%',
		lineHeight : '70px'
	}
});
class SiteListCard extends React.Component {
	state ={
		dataSite : [
			{ site : "Jembayan"},
			{ site : "Muarante"},
			{ site : "Bontang East"},
			{ site : "Soroako"},
			{ site : "Damai"},
			{ site : "Kutai"},
			{ site : "Bontang East"},
			{ site : "Bontang West"},
			{ site : "Bontang South"},
			{ site : "Bontang North"},
			{ site : "Bendili"},
			{ site : "Bendili"},
			{ site : "Bendili"},
			{ site : "Bendili"},
			{ site : "Bendili"},
			{ site : "Bendili"},
			{ site : "Bendili"},
			{ site : "Bendili"},
			{ site : "Bendili"},
		]
	}
	handleClick (value){
		alert(value);
	}
	renderList(row){
		return (
			<Card onClick={()=>this.handleClick(row.dataSite)}>{row.dataSite}</Card>
		);
	}
	render(){
		return(
			<div>
				{this.state.dataSite.map( (row) => (
					<Card className="site-text-content" onClick={()=>this.handleClick(row.site)}>
						<img className="ice-face" src={IceFace} alt=""/>
						{row.site}
					</Card>
				))}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(SiteListCard);