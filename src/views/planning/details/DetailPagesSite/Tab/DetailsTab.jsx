import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab, Typography} from '@material-ui/core';
import SalesOrderList from '../../components/PlanningList/SalesOrderList';
import ServiceOrderList from '../../components/PlanningList/ServiceOrderList';
import RevisedSalesOrderList from '../../components/PlanningList/RevisedSalesOrderList';
import './DetailsTab.scss';
import DropdownFilter from '../../../../../components/FilterByTitle/DropdownFilter';
import { 
    SelectCustomerFilterAction,
    SelectSiteFilterAction, 
    SelectUnitModelFilterAction, 
    SelectComponentFilterAction } 
    from '../../DetailPages-action';
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import roleService from "../../../../../utils/roleService.helper";

const RoleUser = new roleService();
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
    minWidth: 72,
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

class DetailsTab extends React.Component {
  state = {
    value: 0,
    invisible1: false,
    invisible2: true,
    whichTabs: true,
    GroupCustomer: [],
    GroupSite: [],
    GroupUnitModel: [],
    GroupComponentDescription: []
  };


  handleChange = (event, value) => {
    if (value === 0) {
      this.props.onPage(this.state.value);
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
      <>
      <div className={this.props.salesOrderList.Lists.length === 0 
          && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "list-detail-empty" :"plannings-list-detail"}>
        <SalesOrderList 
          {...this.props}
          idSales= "Data Input"
          idTab= "Input"
        />
      </div>
      </>
    );
  }

  _renderRevisionList(){
      return(
        <div className={this.props.salesOrderRevised.Lists.length === 0 
          && this.props.fetchStatusRevised === ApiRequestActionsStatus.SUCCEEDED ? "list-detail-empty" : "paper-revision"}>
          <div className="revision-container">
            <div className="rev-title-container">
              <div className="ut-underline-rev" />
              {this.props.salesOrderRevised.Lists.length === 0 ? "" : 
              <div className="revision-title">Revision List</div>}
            </div>
            <div className="plannings-list-detail">
                <RevisedSalesOrderList
                  {...this.props}
                />
            </div>
            <div>
              {this.props.salesOrderRevised.Lists.length === 0 
                && this.props.fetchStatusRevised === ApiRequestActionsStatus.SUCCEEDED ? "" : this.props.renderPaginationRev}
            </div>
          </div>
        </div>
      )
  }

  _renderServiceOrderList(){
    return(
        <div className={this.props.serviceOrderList.Lists.length === 0 
          && this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED ? "list-detail-empty" : "plannings-list-detail"}>
          <ServiceOrderList 
            {...this.props}
            idService="Data Input"
            isClick={this.props.isClick}
          />
        </div>
    );
  }

  _dataFilterCustomer(){
    if(this.state.value === 0){
      let arr = this.props.salesOrderList.Customers;
      arr.splice(0, 0, "All Customer")
      return arr
    }
    else{
      let arr = this.props.serviceOrderList.Customers;
      arr.splice(0, 0, "All Customer")
      return arr
    }
  }

  _dataFilterSite(){
    if(this.state.value === 0){
      let arr = this.props.salesOrderList.Sites;
      arr.splice(0, 0, "All Site")
      return arr
    }
    else{
      let arr = this.props.serviceOrderList.Sites;
      arr.splice(0, 0, "All Site")
      return arr
    }
  }

  _dataFilterUnitModel(){
    if(this.state.value === 0){
      let arr = this.props.salesOrderList.UnitModels;
      arr.splice(0, 0, "All Unit Model")
      return arr
    }
    else{
      let arr = this.props.serviceOrderList.UnitModels;
      arr.splice(0, 0, "All Unit Model")
      return arr
    }
  }

  _dataFilterComponentDescription(){
    if(this.state.value === 0){
      let arr = this.props.salesOrderList.ComponentDescriptions;
      arr.splice(0, 0, "All Component Description")
      return arr
    }
    else{
      let arr = this.props.serviceOrderList.ComponentDescriptions;
      arr.splice(0, 0, "All Component Description")
      return arr
    }
  }

  _renderFilter() {
    return (
      <div className="dropdowns-detail-site">
        <div className="dropdown-detail-site">
          <DropdownFilter
          {...this.props}
            data={this._dataFilterCustomer()}
            selected={this.props.selectedFilters.customerType}
            onSelectActionType={SelectCustomerFilterAction}
            onSelectAction={this.props.selectFilter2}
            indexTab={this.state.value}
            head={"CustomerName"}
          />
        </div>
        <div className="dropdown-detail-site">
          <DropdownFilter
            {...this.props}
            data={this._dataFilterSite()}
            selected={this.props.selectedFilters.siteType}
            onSelectActionType={SelectSiteFilterAction}
            onSelectAction={this.props.selectFilter2}
            indexTab={this.state.value}
            head={"SiteCode"}
          />
        </div>
        <div className="dropdown-detail-site">
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
        <div className="dropdown-detail-site">
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
        <div className="search-detail-site">
          {this.props.renderSearch}
        </div>
      </div>
    );
  }

  renderTotalSales(){
    return(
      <div className="tab-site">
        <div className="label-site">Sales Order</div>
      </div>      
    )
  }

  renderTotalService(){
    return(
      <div className="tab-site">
        <div className="label-site">Service Order</div>
      </div>      
    )
  }

  _renderTotalData(){
    if (this.state.value === 0) {
      return(
        <div className="total-data-container">
          <div className="text-total">
            {this.props.totalSalesData}
          </div>
          <div className="text-tabs">
             Total Sales Order
          </div>
        </div>
      )
    }
    else{
      return(
        <div className="total-data-container">
          <div className="text-total">
            {this.props.totalServiceData}
          </div>
          <div className="text-tabs">
            Total Service Order
          </div>
        </div>
      )
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    return (
        <div className="root">
          <div className="tab-container-site">
            {this.props.renderSearch}
            {this.props.renderNotif}
            {this.props.renderFilterByDataAction}
          </div>
          <AppBar position="static" color="default" style={{boxShadow: "none"}}>
            <Tabs
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary" >
              {Number(RoleUser.role()) === 2 || Number(RoleUser.role()) === 4
                ? <Tab 
                  centered={true}
                  onClick={() => this.props.clearSelectedServicePlans()} 
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }} 
                  label= {this.renderTotalService()}
                  />
                : <>
                  <Tab 
                    centered={true}
                    onClick={() => this.props.clearSelectedSalesPlans()} 
                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }} 
                    label= {this.renderTotalSales()} 
                  />
                  <Tab 
                    centered={true}
                    onClick={() => this.props.clearSelectedServicePlans()} 
                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }} 
                    label= {this.renderTotalService()}
                  />
                </>
              }
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer dir={theme.direction} >
            <div>{this._renderRevisionList()}</div>
          </TabContainer>}
          <div className="site-container">
            {this.props.salesOrderList.Lists.length === 0 && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "" :
              this.props.serviceOrderList.Lists.length === 0 && this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED ? "" : this._renderTotalData()}
          </div>
          <div className="filters-detail-site">
            {this.props.salesOrderList.Lists.length === 0 && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "" :
              this.props.serviceOrderList.Lists.length === 0 && this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED ? "" : this._renderFilter()}
          </div>
          {value === 0 && <TabContainer dir={theme.direction} >
            <div>{this._renderSalesOrderList()}</div>
          </TabContainer>}
        {value === 1 && <TabContainer dir={theme.direction} ><div>{this._renderServiceOrderList()}</div></TabContainer>}
      </div>
    );
  }
}

DetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DetailsTab);