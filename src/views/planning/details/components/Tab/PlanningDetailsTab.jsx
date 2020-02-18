import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SalesOrderList from '../PlanningList/SalesOrderList';
import ServiceOrderList from '../PlanningList/ServiceOrderList';
import ApprovedSalesOrderList from '../PlanningList/ApprovedSalesOrderList';
import { IconNotif, IconHistory } from '../../../../../assets/icons';
import {Badge, Button} from '@material-ui/core';
import { Menu } from '../../../../../constants';
import './PlanningDetailsTab.scss';
import DropdownFilter from '../../../../../components/FilterByTitle/DropdownFilter';
import { SelectCustomerFilterAction,SelectSiteFilterAction, SelectUnitModelFilterAction, SelectComponentFilterAction } from '../../DetailPages-action'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}
const StyledBadge = withStyles(theme => ({
  badge: {
    right: -42,
    padding: '10px',
    borderRadius: '5px',
    fontSize: '15px'
  },
}))(Badge);

const Badges = withStyles(theme => ({
  badge: {
    right: -32,
    // top: 10,
    padding: '10px',
    borderRadius: '5px',
    fontSize: '15px'
  },
}))(Badge);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    minWidth: 10,
    alignItem: 'center'
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
    alignItem: 'center'
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    alignItem: 'center',
    marginLeft:0,
    // minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 0,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 4,
  },
});

class PlanningDetailsTab extends React.Component {
  state = {
    value: 0,
    invisible1: false,
    invisible2: true,
    GroupCustomer: [],
    GroupSite: [],
    GroupUnitModel: [],
    GroupComponentDescription: []
  };

  handleChange = (event, value) => {
console.log('kondisi value terasek', value)
    if (value === 0) {
      this.props.onPage(this.state.value);
      // this.props.baseButton(this.state.value);
      if (this.state.invisible1) {
        this.setState({
          invisible2 : true
        })
      }
      this.setState({
        invisible1 : false,
        value,
      })
    }
    if (value === 1) {    
      this.props.onPage(this.state.value);
      // this.props.baseButton(this.state.value);
      if (this.state.invisible2) {
        this.setState({
          invisible1 : true
        })
      }
      this.setState({
        invisible2 : false,
        value
      })
    }
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  _renderSalesOrderList(){
    return(
      <div className="plannings-list-containers">
        <SalesOrderList 
        {...this.props}
        />
      </div>
    );
  }

  _renderServiceOrderList(){
    return(
        <div className="plannings-list-containers">
          <ServiceOrderList 
          {...this.props}
          isClick={this.props.isClick}
          />
        </div>
    );
  }

  _dataFilterCustomer(){
    if(this.state.value === 0){
      let arr = this.props.salesOrderList.GroupCustomer;
      arr.splice(0, 0, "All Customer")
      return arr
    }
    else{
      let arr = this.props.serviceOrderList.GroupCustomer;
      arr.splice(0, 0, "All Customer")
      return arr
    }
  }

  _dataFilterSite(){
    if(this.state.value === 0){
      let arr = this.props.salesOrderList.GroupSite;
      arr.splice(0, 0, "All Site")
      return arr
    }
    else{
      let arr = this.props.serviceOrderList.GroupSite;
      arr.splice(0, 0, "All Site")
      return arr
    }
  }

  _dataFilterUnitModel(){
    if(this.state.value === 0){
      let arr = this.props.salesOrderList.GroupUnitModel;
      arr.splice(0, 0, "All Unit Model")
      return arr
    }
    else{
      let arr = this.props.serviceOrderList.GroupUnitModel;
      arr.splice(0, 0, "All Unit Model")
      return arr
    }
  }

  _dataFilterComponentDescription(){
    if(this.state.value === 0){
      let arr = this.props.salesOrderList.GroupComponentDescription;
      arr.splice(0, 0, "All Component Description")
      return arr
    }
    else{
      let arr = this.props.serviceOrderList.GroupComponentDescription;
      arr.splice(0, 0, "All Component Description")
      return arr
    }
  }

  _renderTotalDataInput() {
    return(
      <div className="total-input-container">
        <div className="label-header-input">
          <div className="header-input">
            <div className="input1">
              Data Input
            </div>
            <div className="input2">
              Sales Order
            </div>
          </div>
          <div className="total-data-input">
            {this.props.totalSalesData}
          </div>
        </div>
      </div>
    )
  }

  _renderFilter() {
    return (
      <div className="dropdowns-container">
        <div className="dropdown-container">
          <DropdownFilter
          {...this.props}
            data={this._dataFilterCustomer()}
            selected={this.props.selectedFilters.customerType}
            onSelectActionType={SelectCustomerFilterAction}
            onSelectAction={this.props.selectFilter2}
            indexTab={this.state.value}
            head={"Customer"}
          />
        </div>
        <div className="dropdown-container">
          <DropdownFilter
            {...this.props}
            data={this._dataFilterSite()}
            selected={this.props.selectedFilters.siteType}
            onSelectActionType={SelectSiteFilterAction}
            onSelectAction={this.props.selectFilter2}
            indexTab={this.state.value}
            head={"Site"}
          />
        </div>
        <div className="dropdown-container">
          <DropdownFilter
            {...this.props}
            data={this._dataFilterUnitModel()}
            selected={this.props.selectedFilters.unitType}
            onSelectActionType={SelectUnitModelFilterAction}
            onSelectAction={this.props.selectFilter2}
            indexTab={this.state.value}
            head={"UnitModel"}
          />
        </div>
        <div className="dropdown-container">
          <DropdownFilter
            {...this.props}
            data={this._dataFilterComponentDescription()}
            selected={this.props.selectedFilters.compType}
            onSelectActionType={SelectComponentFilterAction}
            onSelectAction={this.props.selectFilter2}
            indexTab={this.state.value}
            head={"ComponentDescription"}
          />
        </div>
        {/* <div className="base-button-container"> */}
          {/* Tampilan HO */}
          {/* {this.props.renderBaseButton} */}
        {/* </div> */}
        <div className="search-container">
          {/* Tampilan Site */}
          {this.props.renderSearch}
        </div>
      </div>
    );
  }

  renderTotalSales(){
    return(
      <div className="tab-coba">
        <div className="tab-label">Sales Order 
          <span>
            <StyledBadge 
              badgeContent={this.props.totalSalesData} 
              color="primary" 
              invisible={this.state.invisible1}>
            </StyledBadge >
          </span> 
        </div>
      </div>      
    )
  }

  renderTotalService(){
    return(
      <div className="tab-coba">
        <div className="tab-label">Service Order 
        <span>
          <Badges 
            badgeContent={this.props.totalServiceData} 
            color="primary" 
            invisible={this.state.invisible2}>
          </Badges >
        </span> 
      </div>
      </div>      
    )
  }

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    {!this.props.isApproved ? console.log('skuit kondisi false', this.props.totalSalesData) : console.log('skuit kondisi true', this.props.salesOrderListApproved)}
    return (
        <div className="root">
          <div className="tab-container">
            <Button className="btn-approval" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL, 'sales') }>
              Approval
            </Button>
            <div className="btn-header">
              {this.props.renderNotif}
              {this.props.renderFilterByDataAction}
            </div>
          </div>
          {/* TampilanHO renderTotalDataInput + renderFilter*/}
          <div className="data-input-container">
            {this._renderTotalDataInput()}
          </div>
          {/* Tampilan Site hanya renderFilter */}
          <div className="filters-container">
            {this._renderFilter()}
          </div>
    {value === 0 && <TabContainer dir={theme.direction} >
      {/* {!this.props.isApproved ?  */}
    <div>{this._renderSalesOrderList()}</div> 
    {/* <div>{this._renderApprovedSalesOrderList()}</div>}   */}
    </TabContainer>}
        {value === 1 && <TabContainer dir={theme.direction} ><div>{this._renderServiceOrderList()}</div></TabContainer>}
      </div>
    );
  }
}

PlanningDetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PlanningDetailsTab);