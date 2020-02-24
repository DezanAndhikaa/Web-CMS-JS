/* eslint-disable react/prop-types */
import React from 'react';
import LayoutRecorded from './components/LayoutRecorded';
import LayoutSite from './components/LayoutSite';
import LayoutTime from './components/LayoutTime';
import { Menu } from '../../../../../constants';
import Button from '@material-ui/core/Button';
import NotifButton from '../../../../../components/ActionButton/NotifButton/NotifButton';
import FilterbyDataAction  from '../../../../../components/FilterByDataAction/FilterbyDataAction';
import Card from '@material-ui/core/Card';
import './TrackingHistory.scss';
// import classes from '*.module.css';

export default class Status extends React.PureComponent {


    handleClick = (menu) => {
		this.props.push(menu);
      }
    
    componentDidMount = async() =>{
		if(this.props.location.whichTab === "tracking"){
            console.log('mantap mantap')
		}else if(this.props.location.whichTab === undefined){
			this.handleClick(Menu.PLANNING_APPROVAL);
		}
    }

	render(){
		console.log('ini halaman tracking history', this.props.location);
		return(
            <main className="content">
                <div className="head-containers">
                    <div className="back_button">
                        <Button className="button" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL) }>
                            Detail
                        </Button>
                    </div>
                    <div className="notif_button">
                        <FilterbyDataAction
                                {...this.props}
                                titles = "Input Lifetime"
                        />
                        <NotifButton/>
                    </div>
                </div>
                <div className="paper">
                    <LayoutTime/>
                    <LayoutSite/>
                    <LayoutRecorded/>
                </div>
            </main>
			
		);
	}
}
