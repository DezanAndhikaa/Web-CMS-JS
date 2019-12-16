import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import DetailPages from '../../DetailPages';
import SalesOrderList from '../PlanningList/SalesOrderList';
import ServiceOrderList from '../PlanningList/ServiceOrderList'
import { ViewWeek } from '@material-ui/icons';
import './PlanningDetailsTab.scss'
import SalesOrderData from '../../../../../planning-data-dummy.json';
import BaseButton from '../../../../../components/Button/BaseButton'
import Searchbar from "../../../../../components/Searchbar/SearchInput";
import FilterbyDataAction from '../../../../../components/FilterByDataAction/FilterbyDataAction';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
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
  };

  _renderTotalSalesOrder(){
    return(
    <>Total Data {SalesOrderData.jumlahDataSalesOrder} {this._renderBaseButton()}</>
    );
}
  _renderTotalServiceOrder(){
    return(
    <>Total Data {SalesOrderData.jumlahDataServiceOrder} {this._renderBaseButton()}</>
    );
  }

  handleChange = (event, value) => {
    console.log('ini value',event)
    console.log('ini index',this.state.value)
    this.setState({ value });
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
            // stats={this.props.stats}
            isClick={this.props.isClick}
            />
          </div>
      );
    }
  
    _renderSearchBar(){
      return( 
        <div className="plannings-list-containers">
          <Searchbar > &nbsp;&nbsp;&nbsp;&nbsp;</Searchbar>
        </div> 
      );
    }
      
  _renderFilterByDataAction(){
      return(
      <div className="plannings-list-containers">
        <FilterbyDataAction />
      </div>
      );
  }

  _renderBaseButton() {
    return(
      // <div>
        <BaseButton />
      // </div>
    );
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    return (

        <div className="root">
        <AppBar position="static" color="default" style={{boxShadow: "none"}}>
          <Tabs 
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary" >
            <Tab label="Sales Order" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
            <Tab label="Service Order" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
            <Tab classes={{ root: classes.tabRoot }} /><Tab classes={{ root: classes.tabRoot }} />
            <Tab classes={{ root: classes.tabRoot }} /><Tab classes={{ root: classes.tabRoot }} />
            {this._renderSearchBar()} 
            {this._renderFilterByDataAction()}
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer dir={theme.direction}>{this._renderTotalSalesOrder()}<div>{this._renderSalesOrderList()}</div></TabContainer>}
        {value === 1 && <TabContainer dir={theme.direction}>{this._renderTotalServiceOrder()}<div>{this._renderServiceOrderList()} </div></TabContainer>}
        {/* <TabContainer>{this._renderBaseButton()}</TabContainer> */}
      </div>
    );
  }
}

PlanningDetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PlanningDetailsTab);



