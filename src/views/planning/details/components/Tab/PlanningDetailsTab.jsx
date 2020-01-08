import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SalesOrderList from '../PlanningList/SalesOrderList';
import ServiceOrderList from '../PlanningList/ServiceOrderList';
import Badge from '@material-ui/core/Badge';
import './PlanningDetailsTab.scss'
// import SalesOrderData from '../../../../../planning-data-dummy.json';
// import Searchbar from "../../../../../components/Searchbar/SearchInput";
import FilterbyDataAction from '../../../../../components/FilterByDataAction/FilterbyDataAction';
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
    right: -20,
    top: 10,
    padding: '0 4px',
  },
}))(Badge);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
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
  };

  _renderTotalSalesOrder(){
    return(
    <>{this.props.totalSalesData}</>
    );
}
  _renderTotalServiceOrder(){
    return(
    <>{this.props.totalServiceData}</>
    );
  }

  handleChange = (event, value) => {
    console.log('ini index pas di change',this.state.value)
    if (this.state.value === 1) {
      this.setState({
        invisible1 : !this.state.invisible1,
        invisible2 : !this.state.invisible2,
        value
      })
    }
    if (this.state.value === 0) {
      this.setState({
        invisible1 : !this.state.invisible1,
        invisible2 : !this.state.invisible2,
        value
      })
    }
    }
    // this.setState({ value });

  handleChangeIndex = index => {
    console.log('change index berjalan')
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
      
  _renderFilterByDataAction(){
    return(
        <FilterbyDataAction />
    );
  }

  _renderFilter() {
    console.log('ini props untuk filter', this.props.salesOrderList)
    return (
      <div className="dropdowns-container">
        <div className="dropdown-container">
          <DropdownFilter
            data={this.props.salesOrderList.GroupCustomer}
            selected={this.props.selectedFilters.customerType}
            onSelectActionType={SelectCustomerFilterAction}
            onSelectAction={this.props.selectFilter}
          />
        </div>
        <div className="dropdown-container">
          <DropdownFilter
          data={this.props.salesOrderList.GroupSite}
          selected={this.props.selectedFilters.siteType}
          onSelectActionType={SelectSiteFilterAction}
          onSelectAction={this.props.selectFilter}
          />
        </div>
        <div className="dropdown-container">
          <DropdownFilter
          data={this.props.salesOrderList.GroupUnitModel}
          selected={this.props.selectedFilters.unitType}
          onSelectActionType={SelectUnitModelFilterAction}
          onSelectAction={this.props.selectFilter}
          />
        </div>
        <div className="dropdown-container">
          <DropdownFilter
          data={this.props.salesOrderList.GroupComponentDescription}
          selected={this.props.selectedFilters.compType}
          onSelectActionType={SelectComponentFilterAction}
          onSelectAction={this.props.selectFilter}
          />
        </div>
        <div className="search-container">
          {this.props.renderBaseButton}
        </div>
      </div>
    );
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    console.log('state invis 1', this.state.invisible1);
    console.log('state invis 2', this.state.invisible2);
    console.log('ini index',this.state.value);
    return (
        <div className="root">
        <AppBar position="relative" color="default" style={{boxShadow: "none"}}>
        <div className="tab-container"> 
            {this.props.renderSearch} 
            {this._renderFilterByDataAction()}
        </div>
          <Tabs 
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary" >
            {/* <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={<div>Sales Order <span className="badge" style={{visibility: this.state.invisible1}} > {this.props.totalSalesData}</span></div>}/>
            <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={<div>Service Order <span className="badge" visibility={this.state.invisible2} >{this.props.totalServiceData}</span></div>}/> */}
            <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={<StyledBadge badgeContent={this.props.totalSalesData} color="primary" invisible={this.state.invisible1}>
            <>Sales Order</>
            </StyledBadge >} />
            <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={<StyledBadge badgeContent={this.props.totalServiceData} color="primary" invisible={this.state.invisible2}>
            <>Service Order</>
            </StyledBadge >} />
            {/* <Tab disabled classes={{ root: classes.tabRoot }} /><Tab disabled classes={{ root: classes.tabRoot }} />
            <Tab disabled classes={{ root: classes.tabRoot }} /><Tab disabled classes={{ root: classes.tabRoot }} /> */}
            {/* {this.props.renderSearch} 
            {this._renderFilterByDataAction()} */}
          </Tabs>
        </AppBar>
        <div className="filters-container">
          {this._renderFilter()}
        </div>
    {value === 0 && <TabContainer dir={theme.direction}><div>{this._renderSalesOrderList()}</div></TabContainer>}
        {value === 1 && <TabContainer dir={theme.direction}><div>{this._renderServiceOrderList()}</div></TabContainer>}
      </div>
    );
  }
}

PlanningDetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PlanningDetailsTab);