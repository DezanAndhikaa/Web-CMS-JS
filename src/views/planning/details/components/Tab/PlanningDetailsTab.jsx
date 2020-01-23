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
import Badge from '@material-ui/core/Badge';
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
    right: -20,
    top: 10,
    padding: '8px',
    borderRadius: '5px'
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
    GroupCustomer: [],
    GroupSite: [],
    GroupUnitModel: [],
    GroupComponentDescription: []
  };


  handleChange = (event, value) => {
    if (this.state.value === 1) {
      this.props.onPage(this.state.value);
      this.props.wasApprove(this.state.value);
      this.setState({
        invisible1 : !this.state.invisible1,
        invisible2 : !this.state.invisible2,
        value,
      })
    }
    if (this.state.value === 0) {
      this.props.onPage(this.state.value);
      this.props.wasApprove(this.state.value);
      this.setState({
        invisible1 : !this.state.invisible1,
        invisible2 : !this.state.invisible2,
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

  _renderApprovedSalesOrderList(){
    return(
      <div className="planning-list-containers">
        <ApprovedSalesOrderList 
        {...this.props}
        />
      </div>
    )
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
        <div className="search-container">
          {this.props.renderBaseButton}
        </div>
      </div>
    );
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    console.log('skuit', this.props.isApproved)
    {!this.props.isApproved ? console.log('skuit kondisi false', this.props.totalSalesData) : console.log('skuit kondisi true', this.props.salesOrderListApproved)}
    return (
        <div className="root">
        <AppBar position="relative" color="default" style={{boxShadow: "none"}}>
        <div className="tab-container"> 
            {this.props.renderSearch} 
            {this.props.renderFilterByDataAction}
        </div>
          <Tabs 
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary" >
            {/* {!this.props.isApproved ? */}
            <Tab onClick={() => this.props.clearSelectedSalesPlans()} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={<StyledBadge badgeContent={this.props.totalSalesData} color="primary" invisible={this.state.invisible1}>
            <>Sales Order</>
            </StyledBadge >} />
            {/* :  */}
            {/* <Tab onClick={() => this.props.clearSelectedSalesPlans()} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={<StyledBadge badgeContent={this.props.ApprovedSalesData} color="primary" invisible={this.state.invisible1}>
            <>Sales Order</>
            </StyledBadge >} /> } */}


            <Tab onClick={() => this.props.clearSelectedServicePlans()} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={<StyledBadge badgeContent={this.props.totalServiceData} color="primary" invisible={this.state.invisible2}>
            <>Service Order</>
            </StyledBadge >} />
          </Tabs>
        </AppBar>
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