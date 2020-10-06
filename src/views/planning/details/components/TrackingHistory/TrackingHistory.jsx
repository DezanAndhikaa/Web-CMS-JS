/* eslint-disable react/prop-types */
import React from 'react';
import LayoutRecorded from './components/LayoutRecorded/LayoutRecorded';
import LayoutSite from './components/LayoutSite';
import LayoutTime from './components/LayoutTime';
import { Menu } from 'constants/index';
import Button from '@material-ui/core/Button';
import NotifButton from 'components/ActionButton/NotifButton/NotifButton';
import FilterbyDataAction  from 'components/FilterByDataAction/FilterbyDataAction';
import './TrackingHistory.scss';

export default class TrackingHistory extends React.PureComponent {

    state = {
        selected : '',
        timeData : [
            { key : 'today'}, 
            { key :'yesterday'},
            { key : 'last7Days'}, 
            { key : 'last1month'},
            { key :  'last3month'},
            { key :  'last5month'},
            { key :  'last7month'},
            { key :  'lastyear'}

        ]
    }
    handleClick = (menu) => {
		this.props.push(menu);
    }
    handleTime = (value) => {
        this.setState({
            selected : value
        })
    }    
    componentDidMount = async() =>{
		if(this.props.location.whichTab === "tracking"){
		}else if(this.props.location.whichTab === undefined){
			this.handleClick(Menu.PLANNING_APPROVAL);
		}
    }

	render(){
		return(
            <main className="content">
                <div className="head-containers-tracking">
                    <Button className="back_button-tracking" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL) }>
                        Detail
                    </Button>
                    <div className="notif_button-tracking">
                        <FilterbyDataAction
                                {...this.props}
                                titles = "Input Lifetime"
                        />
                        <NotifButton/>
                    </div>
                </div>
                <div className="paper-tracking">
                    <LayoutTime
                        data={this.state.timeData}
                        selected={this.state.selected}
                        handleTime={this.handleTime}
                    />
                    <LayoutSite/>
                    <LayoutRecorded/>
                </div>
            </main>
			
		);
	}
}