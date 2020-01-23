import React from 'react';
import Cards from './components/Card';

export default class ServiceOrderList extends React.PureComponent {
	render(){
		return(
			<div>
				<Cards /> &nbsp; <Cards /> &nbsp; <Cards /> &nbsp; <Cards />
			</div>
		)
	}
}