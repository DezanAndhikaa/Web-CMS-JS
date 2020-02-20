import React from 'react';
import moment, { ISO_8601 } from "moment";
import { Paper, Card, Grid } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './Notification.scss';
import PlanningDetailsTab from '../Tab/PlanningDetailsTab';
import { ApiRequestActionsStatus } from "../../../../../core/RestClientHelpers";
import DropDownList from '../../../../../components/DropdownList/DropDownList';
// import SearchInput from "../../../../../components/Searchbar/SearchInput";
// import BaseButton from '../../../components/Button/BaseButton';
import FilterbyDataAction from '../../../../../components/FilterByDataAction/FilterbyDataAction';
import NotifButton from '../../../../../components/ActionButton/NotifButton/NotifButton';
import { Button } from '@material-ui/core';
import { Menu } from '../../../../../constants';
import CardData from './Components/Card';

class Notification extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        stats: true,
        // isPaging: true,
        isShowPerPage: true,
        showPerPage : 0,
        whichTabs: true,
        isApproved: false,
        snak: true,
        // nextPage: true,
        // prevPage: false,
        // numberOfPage: 2,
        // currentPage: 1,
        // filter: {
        //   filter : {}
        // }
    };
}

componentWillUnmount = () => {
  this.props.updateSalesParameter({
    ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 2, Sort: [], Filter: [],
  });
  this.props.updateServiceParameter({
    ...this.props.serviceParameter.dataFilter, PageNumber: 1, PageSize: 2, Sort: [], Filter: [],
  });
}

componentDidUpdate = (prevProps) => {
  if (prevProps.salesParameter !== this.props.salesParameter) {
    this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
  }
  if (prevProps.serviceParameter !== this.props.serviceParameter) {
    this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
  }
}

  // PAGINATION DENGAN KONDISI UNTUK TAB SALES ORDER ATAU SERVICE ORDER
  _renderPagination= (pageValue) =>  {
    if (pageValue === 1) {
      this.setState({whichTabs : true})
    }if (pageValue === 0) {
      this.setState({whichTabs : false})
    }
    if (this.state.whichTabs === true) {
      const web = this.props.displayMode === 'web';
      const nextSales = this.props.salesOrderList.NextPage;
      const prevSales = this.props.salesOrderList.PrevPage;
      const currentPropsSales = this.props.salesOrderList.PageNumber;
      const { TotalPages } = this.props.salesOrderList;
      
      return(
        <div className="pagination">
          <div className="paging">
            {/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
            {web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
            {web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
            {currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
            <div className="page-active">{currentPropsSales}</div>
            {currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
            {web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
            {web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
            {/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
          </div>
        </div>
      )
      }
    if (this.state.whichTabs === false) {
      const web = this.props.displayMode === 'web';
      const nextSales = this.props.serviceOrderList.NextPage;
      const prevSales = this.props.serviceOrderList.PrevPage;
      const currentPropsService = this.props.serviceOrderList.PageNumber;
      const { TotalPages } = this.props.serviceOrderList;
      
      return(
        <div className="pagination">
          <div className="paging">
            {prevSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
            {web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive">{currentPropsService - 3}</div>}
            {web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive">{currentPropsService - 2}</div>}
            {currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive">{currentPropsService - 1}</div>}
            <div className="page-active">{currentPropsService}</div>
            {/* <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService })} className="page-active">{currentPropsService}</div> */}
            {currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive">{currentPropsService + 1}</div>}
            {web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive">{currentPropsService + 2}</div>}
            {web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive">{currentPropsService + 3}</div>}
            {nextSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
          </div>
        </div>
      )
    }
  }

  //KOMPONEN UNTUK SHOW PER/PAGE
  _renderShowPerPage = () =>{
    return(
      <DropDownList 
      {...this.props}
      // onPageSize={()=>this.handlePageSize()}
      handleClickShowPerPage={this.handleClickShowPerPage}
      />
    )
  }

  _renderTitle(){
    return(
      <div className="title">
        NOTIFICATION
      </div>
    )
  }

  _renderData(){
    return(
      <CardData 
      {...this.props}
      idCard = "See All"
      />
    )
  }

  handleClickShowPerPage = async(value) =>{
    if (this.state.whichTabs === true) {
      console.log('pantej sales', value)
      await this.props.clearSelectedSalesPlans();
      await this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: value})
    }else if (this.state.whichTabs === false) {
      console.log('pantej service', value)
      await this.props.clearSelectedServicePlans();
      await this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value})
    }
  }

  //RENDER KOMPONEN BUTTON NOTIF
  _renderNotif(){
    return (
      <NotifButton 
      {... this.props}
      />
    )
  }

  //KOMPONEN UNTUK FILTER DATA ACTION
  _renderFilterByDataAction = (value) => {
    if (value === 1) {
      this.setState({whichTabs : true})
    }if (value === 0) {
      this.setState({whichTabs : false})
    }
    if (this.state.whichTabs === true) {
      return(
        <>
          <FilterbyDataAction 
            {...this.props}
            titles="Status"
            onClickPlanningApprove={this.onClickApprovedSales}
            onClickPlanningDelete={this.onClickDeletedSales}
            onClickButton={this.handleClickFilterByDataAction}
          />
          <FilterbyDataAction 
            {...this.props}
            titles="Tracking History"
          />
        </>
      );
    }
    if (this.state.whichTabs === false) {
      return(
        <>
          <FilterbyDataAction 
            {...this.props}
            titles="Status"
            onClickPlanningApprove={this.onClickApprovedService}
            onClickPlanningDelete={this.onClickDeletedService}
            onClickButton={this.handleClickFilterByDataAction}
          />
          <FilterbyDataAction 
            {...this.props}
            titles="Tracking History"
          />
        </>
      );
    }
  };

  handleClickFilterByDataAction = () =>{
    this.setState({
      isApproved : !this.state.isApproved
    })
  }

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
  }

  render(){ 
    return(
      <main className="content">
            <div className="table-container">
                <div className="tab-header-notif">  
                    <Button className="btn-approval" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL, 'sales') }>
                    Approval
                    </Button>
                    <div className="btn-header">
                        {this._renderNotif()}
                        {this._renderFilterByDataAction()}
                    </div>
                </div>
                <div className="title-container">
                  {this._renderTitle()}
                </div>
                <div className="mid-container">
                <Paper className="paper">
                  {this._renderData()}
                   <div className="bottom-row">
                  {this._renderShowPerPage()} {this._renderPagination()}
                </div>
                  </Paper>
                </div>   
            </div>
        </main>
    )
  }
}

export default Notification;