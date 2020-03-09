import React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
import { ApiRequestActionsStatus } from "../../../core/RestClientHelpers";
import DropDownList from '../../../components/DropdownList/DropDownList';
import SearchInput from "../../../components/Searchbar/SearchInput";
import FilterbyDataAction from '../../../components/FilterByDataAction/FilterbyDataAction';
import NotifButton from '../../../components/ActionButton/NotifButton/NotifButton';
import { Menu } from '../../../constants';

class DetailPages extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        stats: true,
        isShowPerPage: true,
        showPerPage : 0,
        whichTabs: true,
        isApproved: false,
        snak: true
    };
}

handleClick = (menu) => {
  this.props.push(menu);
}

componentWillUnmount = () => {
  this.props.updateSalesParameter({
    ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 2, Sort: [], Filter: [],
  });
}

componentDidMount = () => {
  if(this.props.location.whichTab === undefined){
    this.handleClick(Menu.PLANNING_APPROVAL)
  }
}

componentDidUpdate = (prevProps) => {
  if (prevProps.salesParameter !== this.props.salesParameter) {
    this.onClickSalesOrder()
  }
  if (this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
    prevProps.approveSalesDownloaded.status === ApiRequestActionsStatus.LOADING) {
    this.onClickDownloadSalesApproved()
  }

  // FILTER DROPDOWN
  if(prevProps.filterParameter !== this.props.filterParameter){
      if(this.props.indexFilterParameter.indexTabParameter === 0){
        this.props.updateSalesParameter({
          ...prevProps.salesParameter.dataFilter, Filter : this.props.filterParameter.Filter, PageNumber: 1
        })
      }else{
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter : this.props.filterParameter.Filter, PageNumber: 1
        })
      }
  }
  //FILTER RANGE LIFETIME
  if(prevProps.filterLifetime !== this.props.filterLifetime){
    this.props.updateSalesParameter({
      ...prevProps.serviceParameter.dataFilter, Filter : this.props.filterLifetime.Filter, PageNumber: 1
    })
  }
  //FILTER RANGE DATE
  if(prevProps.filterDate !== this.props.filterDate){
    console.log('data props filter', this.props.filterDate)
    this.props.updateSalesParameter({
      ...prevProps.salesParameter.dataFilter, Filter : this.props.filterDate.Filter, PageNumber: 1
    })
  }

  //ini untuk trigger sales global search
  if (prevProps.salesSearch !== this.props.salesSearch) {
    this.props.updateSalesParameter({
      ...prevProps.salesParameter.dataFilter, Filter : this.props.salesSearch, PageNumber: 1,
    });
  }
  
  //ini untuk trigger service global search
  if(prevProps.serviceSearch !== this.props.serviceSearch){
    this.props.updateServiceParameter({
      ...prevProps.serviceParameter.dataFilter, Filter : this.props.serviceSearch, PageNumber: 1,
    });
  }
  //search per component
  if(this.state.whichTabs){
    if(prevProps.searchComp !== this.props.searchComp){
      this.props.updateSalesParameter({
        ...prevProps.salesParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
      });
    }
  }else{
    if(prevProps.searchComp !== this.props.searchComp){
      this.props.updateServiceParameter({
        ...prevProps.serviceParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
      });
    }
  }
  
  // SALES ORDER SORTING
  if (prevProps.sortSalesBy !== this.props.sortSalesBy) {
    const { sortSalesBy } = this.props;
    let isDescending = false;
    if (sortSalesBy.Customer.isActive) {
      isDescending = !sortSalesBy.Customer.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'CustomerName',
            Direction : 'desc'
          }],      
      });
    if (sortSalesBy.Customer.isAscending === !sortSalesBy.Customer.isActive) {
      isDescending = !sortSalesBy.Customer.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'CustomerName',
            Direction : 'asc'
          }],      
      });
    }
  }
    if (sortSalesBy.Site.isActive){
      isDescending = !sortSalesBy.Site.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'SiteCode',
            Direction : 'desc'
          }],
      });
    if (sortSalesBy.Site.isAscending === !sortSalesBy.Site.isActive) {
      isDescending = !sortSalesBy.Site.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'SiteCode',
            Direction : 'asc'
          }],
      });
    }
    } 
    if (sortSalesBy.UnitModel.isActive) {
      isDescending = !sortSalesBy.UnitModel.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'UnitModel',
            Direction : 'desc'
          }],
      });
    if (sortSalesBy.UnitModel.isAscending === !sortSalesBy.UnitModel.isActive) {
      isDescending = !sortSalesBy.UnitModel.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'UnitModel',
            Direction : 'asc'
          }],
      });
    }
    };
    if (sortSalesBy.CompDesc.isActive) {
      isDescending = !sortSalesBy.CompDesc.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'ComponentDescription',
            Direction : 'desc'
          }],
      });
    if (sortSalesBy.CompDesc.isAscending === !sortSalesBy.CompDesc.isActive) {
      isDescending = !sortSalesBy.CompDesc.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'ComponentDescription',
            Direction : 'asc'
          }]
      });
    }
    };
  }
  // SERVICE ORDER SORTING
  if (prevProps.sortServiceBy !== this.props.sortServiceBy) {
    const { sortServiceBy } = this.props;
    let isDescending = false;
    if (sortServiceBy.Customer.isActive) {
      isDescending = !sortServiceBy.Customer.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Customer',
            Direction : 'desc'
          }]   
      });
    if (sortServiceBy.Customer.isAscending === !sortServiceBy.Customer.isActive) {
      isDescending = !sortServiceBy.Customer.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Customer',
            Direction : 'asc'
          }]   
      });
    }
  }
    if (sortServiceBy.Site.isActive){
      isDescending = !sortServiceBy.Site.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Site',
            Direction : 'desc'
          }] 
      });
    if (sortServiceBy.Site.isAscending === !sortServiceBy.Site.isActive) {
      isDescending = !sortServiceBy.Site.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Site',
            Direction : 'asc'
          }] 
      });
    }
    } 
    if (sortServiceBy.UnitModel.isActive) {
      isDescending = !sortServiceBy.UnitModel.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'UnitModel',
            Direction : 'desc'
          }] 
      });
    if (sortServiceBy.UnitModel.isAscending === !sortServiceBy.UnitModel.isActive) {
      isDescending = !sortServiceBy.UnitModel.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'UnitModel',
            Direction : 'asc'
          }] 
      });
    }
    };
    if (sortServiceBy.CompDesc.isActive) {
      isDescending = !sortServiceBy.CompDesc.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'ComponentDescription',
            Direction : 'desc'
          }] 
      });
    if (sortServiceBy.CompDesc.isAscending === !sortServiceBy.CompDesc.isActive) {
      isDescending = !sortServiceBy.CompDesc.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'ComponentDescription',
            Direction : 'asc'
          }] 
      });
    }
    };
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

  //SAAT MENGKLIK service ORDER TAB
  onClickServiceOrder = async() => {
    await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter, this.props.token);
  }

  //SAAT MENGKLIK sales ORDER TAB
  onClickSalesOrder = async() =>{
    console.log('lokasinya dimana input: ', this.props.location.whichTab)
    if (this.props.location.whichTab === 'lifetime') {
      await this.props.fetchSalesOrder({
        ...this.props.salesParameter.dataFilter, 
        Filter : 
              [...this.props.salesParameter.dataFilter.Filter, {
                Field : 'LifeTimeComponent',
                Operator : "eq",
                Value : '-',
                Logic : "AND"
        }]
      }, this.props.token);
    }else{
      await this.props.fetchSalesOrder({
        ...this.props.salesParameter.dataFilter, 
        Filter : 
              [...this.props.salesParameter.dataFilter.Filter, {
                Field : 'LifeTimeComponent',
                Operator : "neq",
                Value : '-',
                Logic : "AND"
        }]
      }, this.props.token);
    }
  }

  //KOMPONEN UNTUK SHOW PER/PAGE
  _renderShowPerPage = () =>{
    return(
      <DropDownList 
      {...this.props}
      handleClickShowPerPage={this.handleClickShowPerPage}
      />
    )
  }
  handleClickShowPerPage = async(value) =>{
    if (this.state.whichTabs === true) {
      await this.props.clearSelectedSalesPlans();
      await this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: value})
    }else if (this.state.whichTabs === false) {
      await this.props.clearSelectedServicePlans();
      await this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value})
    }
  }

  //KOMPONEN UNTUK GLOBAL SEARCH
  _renderSearchBar(){
    return (
      <>
        <div className="bottom-row">
          <SearchInput
          {...this.props}
          whichTabs={this.state.whichTabs}
          webInfo="Search"
          onSalesSearch={this.props.onSearchSales}
          onServiceSearch={this.props.onSearchService}
        />
        </div>
      </>
    );
  }


  handleSearch = (value) => {
    if (this.state.whichTabs === true) {
        this.props.onSearchSales(value)
    }else if (this.state.whichTabs === false) {
      setTimeout(() => {
        this.props.onSearchService(value)
      }, 1000)
  }
};

  _renderNotif(){
    return (
      <NotifButton 
        {...this.props}
        idNotif = "Non-Status"
      />
    )
  }

  handleClickFilterByDataAction = () =>{
    this.setState({
      isApproved : !this.state.isApproved
    })
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
    
  isChangeStat = (value,key) =>{
    this.setState({
      lifetime: { Lists :this.state.lifetime.Lists.map(el => (el.SoNumber === key ? {...el, LifeTimeComp : value} : el)) }
    });
  };

  //FUNGSI UNTUK MULTI SELECT SALES ORDER
  updateAssignmentSalesStates = (plan) => {
    if (this.props.selectedSalesPlans
      .some((plans) => plans.SoNumber === plan.SoNumber,
      )) 
    { return this.props.unselectSalesPlan(plan); }
    return this.props.selectSalesPlan(plan);
  };

  //FUNGSI UNTUK MULTI SELECT SERVICE ORDER
  updateAssignmentServiceStates = (plan) => {
    if (this.props.selectedServicePlans
      .some((plans) => plans.WoNumber === plan.WoNumber,
      ))
    { return this.props.unselectServicePlan(plan); }
    return this.props.selectServicePlan(plan);
  };

  //KOMPONEN UNTUK RENDER PAGE SALES ORDER DAN SERVICE ORDER
  _renderTabs(){
    return (
      <>
        <PlanningDetailsTab
          {...this.props}
          renderFilterByDataAction={this._renderFilterByDataAction()} 
          renderSearch={this._renderSearchBar()}
          renderNotif={this._renderNotif()}
          onClickSalesOrder={this.onClickSalesOrder}        
          onClickServiceOrder={this.onClickServiceOrder}
          onChoosedService={this.updateAssignmentServiceStates}
          onChoosedSales={this.updateAssignmentSalesStates}
          selectedSalesPlanList={this.props.selectedSalesPlans}
          selectedServicePlanList={this.props.selectedServicePlans}
          displaySalesCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
          displayServiceCheckbox={this.props.serviceParameter.paramsData.assigmentFilter || this.props.serviceParameter.paramsData.inProgressFilter}
          stats={this.state.stats}
          onStats={this.isChangeStat}     
          totalSalesData={this.props.salesOrderList.TotalData}
          totalServiceData={this.props.serviceOrderList.TotalData}
          ApprovedSalesData={this.props.salesOrderListApproved.TotalData}
          onClickTabHead={this.props.onClickSortBy}
          sortSalesByState={this.props.sortSalesBy}
          sortServiceByState={this.props.sortServiceBy}
          onPage={this._renderPagination}
          isApproved={this.state.isApproved}
        />
      </>
    );
  };

  render(){  
    return(
      <main className="content">
          <div className="table-container">
                {this._renderTabs()}
            </div>
            <div></div>
            <div className="bottom-row">
                {this._renderShowPerPage()} {this._renderPagination()}
            </div>
      </main>
    )
  }
}

export default DetailPages;