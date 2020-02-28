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
import {
	ListItemText,
	ListItemIcon,
	ListItem,
	List,
	Drawer,
	Modal,
	DialogContent,
	Collapse
} from '@material-ui/core';
// import classes from '*.module.css';

export default class Status extends React.PureComponent {

    state = {
        selected : ''
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

    _renderLayoutTime = () =>{
        return(
        <>
        <List>
            <ListItem 
            button
            key="today"
            className={
                this.state.selected === 'today'
                ? "menu-item-selected-tracking"
                : "menu-item-tracking"
            }
            onClick={ () => this.handleTime('today')}
            >
            <ListItemText 
                primary="Today"
                classes={{ primary : "item-text-tracking", root: "item-text-tracking"}}
            >
                Today
            </ListItemText>
            </ListItem>
            <ListItem 
            button
            key="yesterday"
            className={
                this.state.selected === 'yesterday'
                ? "menu-item-selected-tracking"
                : "menu-item-tracking"
            }
            onClick={ () => this.handleTime('yesterday')}
            >
            <ListItemText 
                primary="Yesterday"
                classes={{ primary : "item-text-tracking", root: "item-text-tracking"}}
            >
                Yesterday
            </ListItemText>
            </ListItem>
            <ListItem 
            button
            key="last7Days"
            className={
                this.state.selected === 'last7Days'
                ? "menu-item-selected-tracking"
                : "menu-item-tracking"
            }
            onClick={ () => this.handleTime('last7Days')}
            >
            <ListItemText 
                primary="Last 7 Days"
                classes={{ primary : "item-text-tracking", root: "item-text-tracking"}}
            >
                Last 7 Days
            </ListItemText>
            </ListItem>
            <ListItem 
            button
            key="last1month"
            className={
                this.state.selected === 'last1month'
                ? "menu-item-selected-tracking"
                : "menu-item-tracking"
            }
            onClick={ () => this.handleTime('last1month')}
            >
            <ListItemText 
                primary="Last 1 Month"
                classes={{ primary : "item-text-tracking", root: "item-text-tracking"}}
            >
                Last 1 Month
            </ListItemText>
            </ListItem>
            <ListItem 
            button
            key="last3month"
            className={
                this.state.selected === 'last3month'
                ? "menu-item-selected-tracking"
                : "menu-item-tracking"
            }
            onClick={ () => this.handleTime('last3month')}
            >
            <ListItemText 
                primary="Last 3 Month"
                classes={{ primary : "item-text-tracking", root: "item-text-tracking"}}
            >
                Last 3 Month
            </ListItemText>
            </ListItem>
            <ListItem 
            button
            key="last5month"
            className={
                this.state.selected === 'last5month'
                ? "menu-item-selected-tracking"
                : "menu-item-tracking"
            }
            onClick={ () => this.handleTime('last5month')}
            >
            <ListItemText 
                primary="Last 5 Month"
                classes={{ primary : "item-text-tracking", root: "item-text-tracking"}}
            >
                Last 5 Month
            </ListItemText>
            </ListItem>
            <ListItem 
            button
            key="last7month"
            className={
                this.state.selected === 'last7month'
                ? "menu-item-selected-tracking"
                : "menu-item-tracking"
            }
            onClick={ () => this.handleTime('last7month')}
            >
            <ListItemText 
                primary="Last 7 Month"
                classes={{ primary : "item-text-tracking", root: "item-text-tracking"}}
            >
                Last 7 Month
            </ListItemText>
            </ListItem>
            <ListItem 
            button
            key="lastyear"
            className={
                this.state.selected === 'lastyear'
                ? "menu-item-selected-tracking"
                : "menu-item-tracking"
            }
            onClick={ () => this.handleTime('lastyear')}
            >
            <ListItemText 
                primary="Last Year"
                classes={{ primary : "item-text-tracking", root: "item-text-tracking"}}
            >
                Last Year
            </ListItemText>
            </ListItem>
        </List>
        </>
        )
    }

    handleSearch =()=>{

    }

	render(){
        console.log('ini halaman tracking history', this.props.location);
        console.log('ini halaman tracking history', this.state.selected);
		return(
            <main className="content">
                <div className="head-containers-tracking">
                    <div className="back_button-tracking">
                        <Button className="button" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL) }>
                            Detail
                        </Button>
                    </div>
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
                    renderLayoutTime={this._renderLayoutTime}
                    />
                    <LayoutSite/>
                    <LayoutRecorded/>
                </div>
            </main>
			
		);
	}
}