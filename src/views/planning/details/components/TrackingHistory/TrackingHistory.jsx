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
            console.log('mantap mantap')
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
                this.state.selected.includes === 'today'
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
        </List>
        </>
        )
    }

	render(){
        console.log('ini halaman tracking history', this.props.location);
        console.log('ini halaman tracking history', this.state.selected);
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
