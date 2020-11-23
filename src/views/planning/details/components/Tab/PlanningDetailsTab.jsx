import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SalesOrderList from 'views/planning/details/components/PlanningList/SalesOrderList';
import { Badge, Button, Typography } from '@material-ui/core';
import { Menu } from 'constants/index';
import './PlanningDetailsTab.scss';
import DropdownFilter from 'components/FilterByTitle/DropdownFilter';
import {
  SelectCustomerFilterAction,
  SelectSiteFilterAction,
  SelectUnitModelFilterAction,
  SelectComponentFilterAction,
  SelectPlanTypeFilterAction
}
  from 'views/planning/details/DetailPages-action';
import { ApiRequestActionsStatus } from 'core/RestClientHelpers';

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
    marginLeft: 0,
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
    Customers: [],
    Sites: [],
    UnitModels: [],
    ComponentDescriptions: []
  };

  handleChange = (event, value) => {
    if (value === 0) {
      this.props.onPage(this.state.value);
      if (this.state.invisible1) {
        this.setState({
          invisible2: true
        })
      }
      this.setState({
        invisible1: false,
        value,
      })
    }
    if (value === 1) {
      this.props.onPage(this.state.value);
      if (this.state.invisible2) {
        this.setState({
          invisible1: true
        })
      }
      this.setState({
        invisible2: false,
        value
      })
    }
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  _renderSalesOrderList() {
    return (
      <div className={this.props.salesOrderList.Data.Lists.length === 0
        && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "plannings-list-empty" : "plannings-list-containers"}>
        <SalesOrderList
          {...this.props}
          pageLoc= "Status"
          idSales= "Data Input"
          idTab= "Input"
        />
      </div>
    );
  }

  _dataFilterCustomer() {
    if (this.state.value === 0) {
      let arr = this.props.salesOrderList.Meta.filter.Customers;
      arr.splice(0, 0, "All Customer")
      return arr
    }
    else {
      let arr = this.props.serviceOrderList.Meta.filter.Customers;
      arr.splice(0, 0, "All Customer")
      return arr
    }
  }

  _dataFilterSite() {
    if (this.state.value === 0) {
      let arr = this.props.salesOrderList.Meta.filter.Sites;
      arr.splice(0, 0, "All Site")
      return arr
    }
    else {
      let arr = this.props.serviceOrderList.Meta.filter.Sites;
      arr.splice(0, 0, "All Site")
      return arr
    }
  }

  _dataFilterUnitModel() {
    if (this.state.value === 0) {
      let arr = this.props.salesOrderList.Meta.filter.UnitModels;
      arr.splice(0, 0, "All Unit Model")
      return arr
    }
    else {
      let arr = this.props.serviceOrderList.Meta.filter.UnitModels;
      arr.splice(0, 0, "All Unit Model")
      return arr
    }
  }

  _dataFilterComponentDescription() {
    if (this.state.value === 0) {
      let arr = this.props.salesOrderList.Meta.filter.ComponentDescriptions;
      arr.splice(0, 0, "All Component Description")
      return arr
    }
    else {
      let arr = this.props.serviceOrderList.Meta.filter.ComponentDescriptions;
      arr.splice(0, 0, "All Component Description")
      return arr
    }
  }

  _dataFilterPlanType() {
    if (this.state.value === 0) {
      let arr = this.props.salesOrderList.Meta.filter.PlanType;
      arr.splice(0, 0, "All Plan Type")
      return arr
    }
  }

  _renderTotalDataInput() {
    return (
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
          <div className={this.props.totalSalesData > 1 ? "total-data-inputs" : "total-data-input"}>
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
            head={"CustomerName"}
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
            head={"SiteCode"}
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
        <div className="dropdown-container">
          <DropdownFilter
            {...this.props}
            data={this._dataFilterPlanType()}
            selected={this.props.selectedFilters.planType}
            onSelectActionType={SelectPlanTypeFilterAction}
            onSelectAction={this.props.selectFilter2}
            indexTab={this.state.value}
            head={"PlanType"}
          />
        </div>
        <div className="search-container">
          {this.props.renderSearch}
        </div>
      </div>
    );
  }

  renderTotalSales() {
    return (
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

  renderTotalService() {
    return (
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
    const { theme } = this.props;
    const { value } = this.state;
    return (
      <div className="root">
        <div className="tab-container">
          <Button className="btn-back-to-ho" variant="outlined" onClick={() => this.handleClick(Menu.PLANNING_HO)}>
            HO
          </Button>
          <div className="btn-header">
            {this.props.renderNotif}
            {this.props.renderFilterByDataAction}
          </div>
        </div>
        <div className="data-input-container">
          {this.props.salesOrderList.Data.Lists.length === 0 && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "" : this._renderTotalDataInput()}
        </div>
        <div className="filters-container">
          {this.props.salesOrderList.Data.Lists.length === 0 && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "" : this._renderFilter()}
        </div>
        {value === 0 && <TabContainer dir={theme.direction} >
          <div>
            {this._renderSalesOrderList()}
          </div>
        </TabContainer>}
      </div>
    );
  }
}

PlanningDetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PlanningDetailsTab);