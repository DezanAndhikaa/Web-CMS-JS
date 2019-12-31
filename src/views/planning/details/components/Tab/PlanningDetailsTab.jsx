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
import SalesOrderData from '../../../../../planning-data-dummy.json';
import BaseButton from '../../../../../components/Button/BaseButton';
import Searchbar from "../../../../../components/Searchbar/SearchInput";
import FilterbyDataAction from '../../../../../components/FilterByDataAction/FilterbyDataAction';
import DropdownFilter from '../../../../../components/FilterByTitle/DropdownFilter';
import DeleteButton from '../../../../../components/DeleteConfirmation/DeleteSuccess';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

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
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
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
    padding: theme.spacing.unit * 3,
  },
});

class PlanningDetailsTab extends React.Component {
  state = {
    value: 0,
    invisible1: false,
    invisible2: false,
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
    if (this.state.invisible2 === false) {
      this.setState({
        invisible1 : !this.state.invisible1,
        value
      })
    // if (this.state.invisible2 === true) {
    //   this.setState({
    //     invisible1 : this.state.invisible2
    //   })
    }
    // this.setState({ value });
  };

  handleChangeIndex = index => {
      console.log('ini index',this.state.value)
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

  // _renderSearchBar(){
  //   return (
  //     <Searchbar
  //       {...this.props}
  //       webInfo="Search by all component"
  //       onSearch={this.props.onSearch}
  //     />
  //   );
  // }
      
  _renderFilterByDataAction(){
    return(
      <div className="plannings-list-containers">
        <FilterbyDataAction />
      </div>
    );
  }

  _renderBaseButton() {
    return(
      <BaseButton 
      />
    );
  }

  _renderFilter() {
    console.log('ini props untuk filter', this.props.salesOrderList)
    return (
      <div className="dropdowns-container">
        <div className="dropdown-container">
          <DropdownFilter
          // console.log('hasduifhaskfhask;',this.props.salesOrderList.GroupSo)
            data={this.props.salesOrderList.GroupCustomer}
            selected={this.props.selectedFilters.customerType}
            // onSelectActionType={SelectJobsTypeFilterAction}
            // onSelectAction={this.props.selectFilter}
          />
        </div>
        <div className="dropdown-container">
          <DropdownFilter
          data={this.props.salesOrderList.GroupSite}
          selected={this.props.selectedFilters.siteType}
          />
        </div>
        <div className="dropdown-container">
          <DropdownFilter
          data={this.props.salesOrderList.GroupUnitModel}
          selected={this.props.selectedFilters.unitType}
          />
        </div>
        <div className="dropdown-container">
          <DropdownFilter
          data={this.props.salesOrderList.GroupComponentDescription}
          selected={this.props.selectedFilters.compType}
          />
        </div>
        <div className="search-container">
          {this._renderBaseButton()}
        </div>
      </div>
    );
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
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
            <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={<Badge badgeContent={this.props.totalSalesData} color="primary" className="badge" invisible={this.state.invisible1}>
            <>Sales Order</>
            </Badge >} />
            <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={<Badge badgeContent={this.props.totalServiceData} color="secondary" className="badge" invisible={this.state.invisible2}>
            <>Service Order</>
            </Badge >} />
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