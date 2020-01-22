import React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
import DropDownList from '../../../components/DropdownList/DropDownList';
import SearchInput from "../../../components/Searchbar/SearchInput";
import BaseButton from '../../../components/Button/BaseButton';
import FilterbyDataAction from '../../../components/FilterByDataAction/FilterbyDataAction';

class DetailPages extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        stats: true,
        lifetime: this.props.salesOrderList.Lists,
        isPaging: true,
        isShowPerPage: true,
        showPerPage : 0,
        selectedData: {
          So : [],
          IsApprove: false,
          UpdatedBy: "string",
          UpdatedByName: "string",
          UpdatedDate: ""
        },
        selectedServiceData: {
          Wo : [],
          IsApprove: false,
        },
        deleteSalesData: {
          So : [],
          IsDelete: false,
          UpdatedBy: "string",
          UpdatedByName: "string",
          UpdatedDate: ""
        },
        deleteServiceData: {
          Wo : [],
          IsDelete: false
        },
        wasApprove: true
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
  this.props.onSearch('');

  this.props.updateSalesParameter({
    ...this.props.salesParameter.dataFilter, Search: '',
  });
}

componentDidUpdate = (prevProps) => {
  if (prevProps.salesParameter !== this.props.salesParameter) {
    this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
  }

  // FILTER DROPDOWN
  if(prevProps.filterParameter !== this.props.filterParameter){
    console.log('dumtt,',this.props.filterParameter)
      if(this.props.indexFilterParameter.indexTabParameter === 0){
        this.props.fetchSalesOrder(this.props.filterParameter);
        // this.props.clearSelectedSalesPlans();
      }else{
        this.props.fetchServiceOrder(this.props.filterParameter.dataFilter);
        // this.props.clearSelectedServicePlans();
      }
  }
  if (prevProps.serviceParameter !== this.props.serviceParameter) {
    this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
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
  if(this.state.isPaging){
    if(prevProps.searchComp !== this.props.searchComp){
      this.props.updateSalesParameter({
        ...prevProps.serviceParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
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
            Field : 'Customer',
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
            Field : 'Customer',
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
            Field : 'Site',
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
            Field : 'Site',
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

  _renderPagination= (pageValue) =>  {
    if (pageValue === 1) {
      this.setState({isPaging : true})
    }if (pageValue === 0) {
      this.setState({isPaging : false})
    }
    if (this.state.isPaging === true) {
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
    if (this.state.isPaging === false) {
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

  onClickServiceOrder = () => {
    this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
  }

  onClickSalesOrder = () =>{
    this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
  }

  _renderShowPerPage(){
    return(
      <DropDownList 
      {...this.props}
      onPageSize={()=>this.handlePageSize()}
      />
    )
  }
  _renderSearchBar(){
    return (
      <SearchInput
        {...this.props}
        wasApprove={this.state.wasApprove}
        webInfo="Search"
        onSalesSearch={this.props.onSearchSales}
        onServiceSearch={this.props.onSearchService}
      />
    );
  }

  onClickApprovedSales = () => {
    this.props.fetchApprovedSales(this.props.salesParameter.dataFilter);
  }

  onClickApprovedService = () => {
    this.props.fetchApprovedService(this.props.serviceParameter.dataFilter);
  }

  onClickDeletedSales = () => {
    this.props.fetchDeletedSales(this.props.salesParameter.dataFilter);
  }

  onClickDeletedService = () => {
    this.props.fetchDeletedService(this.props.serviceParameter.dataFilter);
  }

  _renderFilterByDataAction = (value) => {
    if (value === 1) {
      this.setState({wasApprove : true})
    }if (value === 0) {
      this.setState({wasApprove : false})
    }
    if (this.state.wasApprove === true) {
      return(
        <FilterbyDataAction 
          {...this.props}
          onClickPlanningApprove={this.onClickApprovedSales}
          onClickPlanningDelete={this.onClickDeletedSales}
        />
      );
    }
    if (this.state.wasApprove === false) {
      return(
        <FilterbyDataAction 
          {...this.props}
          onClickPlanningApprove={this.onClickApprovedService}
          onClickPlanningDelete={this.onClickDeletedService}
        />
      );
    }
  }

  _renderBaseButton = (value) => {
    if (value === 1) {
      this.setState({wasApprove : true})
    }if (value === 0) {
      this.setState({wasApprove : false})
    }
    if (this.state.wasApprove === true) {
      return(
				<div className="bottom-row">
          <BaseButton titles="Total" totalSelectedItems ={this.props.selectedSalesPlans.length}/>
          <BaseButton titles="Delete" 
            {...this.props}
            disabledButton = {this.props.selectedSalesPlans.length < 1 }
            totalSelectedItems ={this.props.selectedSalesPlans.length}
            whatTabsIsRendered={this.state.isPaging}
            deleteSalesData={this.state.deleteSalesData}
          />
					<BaseButton titles="Download" />
          <BaseButton titles="Approve"
            {...this.props}
            disabledButton = {this.props.selectedSalesPlans.length < 1 }
            totalSelectedItems ={this.props.selectedSalesPlans.length}
            whatTabsIsRendered={this.state.isPaging}
            selectedData={this.state.selectedData}
          />
        </div>
      );
    }
    if (this.state.wasApprove === false) {
      return(
				<div className="bottom-row">
          <BaseButton titles="Total" totalSelectedItems ={this.props.selectedServicePlans.length}/>
          <BaseButton titles="Delete" 
            {...this.props}
            disabledButton = {this.props.selectedServicePlans.length < 1 }
            totalSelectedItems ={this.props.selectedServicePlans.length}
            whatTabsIsRendered={this.state.isPaging}
            deleteServiceData={this.state.deleteServiceData}
          />
					<BaseButton titles="Download"  />
          <BaseButton titles="Approve"
            {...this.props}
            disabledButton = {this.props.selectedServicePlans.length < 1 }
            totalSelectedItems ={this.props.selectedServicePlans.length}
            whatTabsIsRendered={this.state.isPaging}
            selectedServiceData={this.state.selectedServiceData}
          />
        </div>
      );
    }
  }
    
  isChangeStat = (value,key) =>{
    this.setState({
      lifetime: { Lists :this.state.lifetime.Lists.map(el => (el.SO === key ? {...el, LifeTimeComp : value} : el)) }
    });
  }

  updateAssignmentSalesStates = (plan) => {
    if (this.props.selectedSalesPlans
      .some((plans) => plans.So === plan.So,
        this.setState({
          selectedData : {So:[...this.state.selectedData.So, plan.So], IsApprove: true, UpdatedBy: "admin", UpdatedByName: "admin", UpdatedDate: ""},
          deleteSalesData : {So:[...this.state.deleteSalesData.So, plan.So], IsDelete: true, UpdatedBy: "admin", UpdatedByName: "admin", UpdatedDate: "2019-01-15"}
        }),
      )) 
    { return this.props.unselectSalesPlan(plan); }
    return this.props.selectSalesPlan(plan);
  };

  updateAssignmentServiceStates = (plan) => {
    if (this.props.selectedServicePlans
      .some((plans) => plans.Wo === plan.Wo,
        this.setState({
          selectedServiceData : {Wo:[...this.state.selectedServiceData.Wo, plan.Wo], IsApprove: true},
          deleteServiceData : {Wo:[...this.state.deleteServiceData.Wo, plan.Wo], IsDelete: true}
        }),
      ))
    { return this.props.unselectServicePlan(plan); }
    return this.props.selectServicePlan(plan);
  };

  _renderTabs(){
    return (
      <>
        <PlanningDetailsTab
          {...this.props}
          renderFilterByDataAction={this._renderFilterByDataAction()}
          renderBaseButton={this._renderBaseButton()}
          renderSearch={this._renderSearchBar()}
          onClickSalesOrder={this.onClickSalesOrder}        
          onClickServiceOrder={this.onClickServiceOrder}
          // onSearchValue={this.onSearchValue}
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
          onClickTabHead={this.props.onClickSortBy}
          sortSalesByState={this.props.sortSalesBy}
          sortServiceByState={this.props.sortServiceBy}
          onPage={this._renderPagination}
          wasApprove={this._renderBaseButton}
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