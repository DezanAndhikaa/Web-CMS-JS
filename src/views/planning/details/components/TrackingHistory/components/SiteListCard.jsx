import React from 'react';
import Card from '@material-ui/core/Card';
import { List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


class SiteListCard extends React.Component {
	state ={
		dataSite : ['Jembayan', 'Muaratae', 'Bontang East', 'Soroako', 
				'Damai', 'Bendili', 'Adaro', 'MTBU', 'Muaralawa']
	}
	handleClick (value){
		alert(value);
	}
	renderList(row){
		console.log('pann ter render')
		return (
			<Card onClick={()=>this.handleClick(row.dataSite)}>{row.dataSite}</Card>
		);
	}
	render(){
		console.log('tekkk ', this.state.dataSite)
		return(
			<>
				<List>
				{this.state.dataSite && this.state.dataSite.map((row) => (
					this.renderList(row)
				))}
				</List>
			</>
		);
	}
}

export default SiteListCard;