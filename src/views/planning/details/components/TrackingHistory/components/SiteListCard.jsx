import React from 'react';
import Card from '@material-ui/core/Card';
import { List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


class SiteListCard extends React.Component {
	state ={
		dataSite : [
			{ site : "Jembayan"},
			{ site : "Muarante"},
			{ site : "Bontang East"},
			{ site : "Soroako"},
			{ site : "Damai"},
			{ site : "Bendili"},
		]
	}
	handleClick (value){
		alert(value);
	}
	renderList(row){
		// console.log('pann ter render')
		// return (
		// <List>
		// 	<Card onClick={()=>this.handleClick(row.dataSite)}>{row.dataSite}</Card>
		// </List>
		// );
	}
	render(){
		return(
			<div>
				{this.state.dataSite.map( (row) => (
					<div>{row.site}</div>
				))}
			</div>
		);
	}
}

export default SiteListCard;