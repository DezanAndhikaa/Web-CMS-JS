

import React from 'react';
import { ImgUnderDev } from '../../assets/imgs';
import './Dashboard.scss';

class Dashboard extends React.PureComponent {
	render() {
		return (
			<main className="content">
				<div className= "db-under-dev">
					<img className="img-under-dev" src={ImgUnderDev} alt="" /> 
					<div className="content-1"><b>Dashboard Page</b> is currently</div>
					<div className="main-contents">Under Development !</div>
					<div className="content-2">We'll back shortly</div>
				</div>
			</main>
		);
	}
}

export default Dashboard;
