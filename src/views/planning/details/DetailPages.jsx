import React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
import DropDownList from '../../../components/DropdownList/DropDownList';
// import { Base } from '../../../base-url';
import SalesDummy from '../../../../src/dummy.json';
import SearchInput from "../../../components/Searchbar/SearchInput";
import BaseButton from '../../../components/Button/BaseButton';

class DetailPages extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        stats: true,
        lifetime: [],
        isPaging: true,
        isShowPerPage: true,
        showPerPage : 0,
        selectedData: {
          SO : [],
          IsApprove: false,
          UpdatedBy: "string",
          UpdatedByName: "string",
          UpdatedDate: ""
        },
        selectedServiceData: {
          Wo : [],
          IsApprove: false,
        }
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
    ...this.props.salesParameter, Search: '',
  });
}

// componentWillReceiveProps(props) {
//   this.state = {
//     lifetime: props.salesOrderList.Lists,
//     indexPage: props.indexFilterParameter.indexTabParameter
//   }
// }

componentDidUpdate = (prevProps) => {
  if (prevProps.salesParameter !== this.props.salesParameter) {
    this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
  }
  // FILTER DROPDOWN
  if(prevProps.filterParameter !== this.props.filterParameter){
      if(this.props.indexFilterParameter.indexTabParameter === 0){
        console.log("klklklklklkl : ", this.props.filterParameter )
        this.props.fetchSalesOrder(this.props.filterParameter.dataFilter);
      }else{
        this.props.fetchServiceOrder(this.props.filterParameter.dataFilter);
      }
  }
  if (prevProps.serviceParameter !== this.props.serviceParameter) {
    this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
  }
  if (prevProps.Search !== this.props.Search) {
    this.props.updateSalesParameter({
      ...prevProps.salesParameter.dataFilter, Search: this.props.Search, PageNumber: 1,
    });
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
          PageSize: 2,
          Sort: 'Customer desc',      
      });
    if (sortSalesBy.Customer.isAscending === !sortSalesBy.Customer.isActive) {
      isDescending = !sortSalesBy.Customer.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'Customer asc'      
      });
    }
  }
    if (sortSalesBy.Site.isActive){
      isDescending = !sortSalesBy.Site.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'Site desc'
      });
    if (sortSalesBy.Site.isAscending === !sortSalesBy.Site.isActive) {
      isDescending = !sortSalesBy.Site.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'Site asc'
      });
    }
    } 
    if (sortSalesBy.UnitModel.isActive) {
      isDescending = !sortSalesBy.UnitModel.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'UnitModel desc'
      });
    if (sortSalesBy.UnitModel.isAscending === !sortSalesBy.UnitModel.isActive) {
      isDescending = !sortSalesBy.UnitModel.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'UnitModel asc'
      });
    }
    };
    if (sortSalesBy.CompDesc.isActive) {
      isDescending = !sortSalesBy.CompDesc.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'ComponentDescription desc'
      });
    if (sortSalesBy.CompDesc.isAscending === !sortSalesBy.CompDesc.isActive) {
      isDescending = !sortSalesBy.CompDesc.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'ComponentDescription asc'
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
          PageSize: 2,
          Sort: 'Customer desc'   
      });
    if (sortServiceBy.Customer.isAscending === !sortServiceBy.Customer.isActive) {
      isDescending = !sortServiceBy.Customer.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'Customer asc'   
      });
    }
  }
    if (sortServiceBy.Site.isActive){
      isDescending = !sortServiceBy.Site.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'Site desc' 
      });
    if (sortServiceBy.Site.isAscending === !sortServiceBy.Site.isActive) {
      isDescending = !sortServiceBy.Site.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'Site asc' 
      });
    }
    } 
    if (sortServiceBy.UnitModel.isActive) {
      isDescending = !sortServiceBy.UnitModel.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'UnitModel desc' 
      });
    if (sortServiceBy.UnitModel.isAscending === !sortServiceBy.UnitModel.isActive) {
      isDescending = !sortServiceBy.UnitModel.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'UnitModel asc' 
      });
    }
    };
    if (sortServiceBy.CompDesc.isActive) {
      isDescending = !sortServiceBy.CompDesc.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'ComponentDescription desc' 
      });
    if (sortServiceBy.CompDesc.isAscending === !sortServiceBy.CompDesc.isActive) {
      isDescending = !sortServiceBy.CompDesc.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          PageSize: 2,
          Sort: 'ComponentDescription asc' 
      });
    }
    };
    // this.props.updateSalesParameter({
    //   ...this.props.salesParameter,
    //   dataFilter : {
    //     PageNumber: 1,
    //     PageSize: 2,
    //     Sort: 'Customer asc'
    //   },
    //   currentPage: 1,
    // });
  }
  // console.log('sales parameter setelah di sorting', this.props.salesParameter)
  // console.log('service parameter setelah di sorting', this.props.serviceParameter)
  console.log('ini selected service',this.props.selectedServicePlans.length)
  console.log('ini selected sales',this.props.selectedSalesPlans)
  console.log('data filter salesss', this.props.salesParameter )
  console.log('data filter terupdate serviceee', this.props.serviceParameter )
}

onClickApproveBtn = () => {
  // this.props.getMechanics(this.props.token);
  this.setState({ isShowAssign: true });
  this.props.approveSales(this.props.salesParameter.dataFilter);
}
  
  _renderPagination= (pageValue) =>  {
    if (pageValue === 1) {
      this.setState({isPaging : true})
    }if (pageValue === 0) {
      this.setState({isPaging : false})
    }
    // console.log('ini data untuk paging',pageValue)
    // this.setState({NumberOfPages : pageValue})
    console.log('ini data untuk paging',this.state.isPaging);
    if (this.state.isPaging === true) {
      const web = this.props.displayMode === 'web';
      const nextSales = this.props.salesOrderList.NextPage;
      const prevSales = this.props.salesOrderList.PrevPage;
      const currentPropsSales = this.props.salesOrderList.PageNumber;
      const { TotalPage } = this.props.salesOrderList;
      
      return(
        <div className="pagination">
          <div className="paging">
            {/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
            {web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
            {web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
            {currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
            <div className="page-active">{currentPropsSales}</div>
            {currentPropsSales + 1 <= TotalPage && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
            {web && currentPropsSales + 2 < TotalPage && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
            {web && currentPropsSales + 3 < TotalPage && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
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
      const { TotalPage } = this.props.serviceOrderList;
      
      return(
        <div className="pagination">
          <div className="paging">
            {prevSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
            {web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive">{currentPropsService - 3}</div>}
            {web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive">{currentPropsService - 2}</div>}
            {currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive">{currentPropsService - 1}</div>}
            <div className="page-active">{currentPropsService}</div>
            {/* <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService })} className="page-active">{currentPropsService}</div> */}
            {currentPropsService + 1 <= TotalPage && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive">{currentPropsService + 1}</div>}
            {web && currentPropsService + 2 < TotalPage && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive">{currentPropsService + 2}</div>}
            {web && currentPropsService + 3 < TotalPage && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive">{currentPropsService + 3}</div>}
            {nextSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
          </div>
        </div>
      // </div>
    )
  }
}
  

  onClickServiceOrder = () => {
    this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
    // console.log('ini data dari api',this.props.serviceParameter.dataFilter);
  }

  onClickSalesOrder = () =>{
    console.log('ini filter paging ', this.props.salesParameter.dataFilter )
    this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
  }

  handlePageSize = (numberOfPage) => {
    // this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: numberOfPage})
    // this.setState({
    //     showPerPage : numberOfPage
    //   })
    // const pageNumber = this.props.salesParameter.dataFilter.PageSize
    // const pageNumber = numberOfPage;
    // this.props.fetchSalesOrder({...this.props.salesParameter.dataFilter, PageSize : pageNumber }) 
    // console.log('ini page number', pageNumber)
    console.log('ini pagenumber yg sudah diklik', numberOfPage)
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
        webInfo="Search by all component"
        onSearch={this.props.onSearch}
      />
    );
  }

  _renderBaseButton = () => {
    if (this.props.salesParameter.paramsData.assigmentFilter) {
      return(
				<div className="bottom-row">
          <BaseButton titles="TotalSales" totalSalesSelected ={this.props.selectedSalesPlans.length}/>
          <BaseButton titles="Delete" />
					<BaseButton titles="Download"  />
          <BaseButton titles="Approve"
            {...this.props}
            onClick={this.onClickApproveBtn}
            disabledButton = {this.props.selectedSalesPlans.length < 1 }
            totalSelectedItems ={this.props.selectedSalesPlans.length}
            whatTabsIsRendered={this.state.isPaging}
            selectedData={this.state.selectedData}
          />
        </div>
      );
    }
    if (this.props.serviceParameter.paramsData.assigmentFilter) {
      return(
				<div className="bottom-row">
          <BaseButton titles="TotalService" totalServiceSelected ={this.props.selectedServicePlans.length}/>
          <BaseButton titles="Delete" />
					<BaseButton titles="Download"  />
          <BaseButton titles="Approve"
            {...this.props}
            onClick={this.onClickApproveBtn}
            disabledButton = {this.props.selectedServicePlans.length < 1 }
            totalSelectedItems ={this.props.selectedServicePlans.length}
            whatTabsIsRendered={this.state.isPaging}
            selectedServiceData={this.state.selectedServiceData}
          />
        </div>
      );
    }
  }
    
  // isChangeStat = (value,key) =>{
  //   this.setState({
  //     lifetime: this.state.lifetime.map(el => (el.SO === key ? {...el, LifeTimeComp : value} : el))
  //   });
  // }

  updateAssignmentServiceStates = (plan) => {
    if (this.props.selectedServicePlans.some(
      (plans) => plans.Wo === plan.Wo,
      this.setState({
        selectedServiceData : {Wo:[...this.state.selectedServiceData.Wo, plan.WO], IsApprove: true}
      }),
    )) { return this.props.unselectServicePlan(plan); }
    return this.props.selectServicePlan(plan);
  };

  updateAssignmentSalesStates = (plan) => {
    console.log('iniiiiiiiiiiiiii', this.state.lifetime)
    if (this.props.selectedSalesPlans.some(
      (plans) => plans.SO === plan.SO,
      this.setState({
        selectedData : {S0:[...this.state.selectedData.SO, plan.SO], IsApprove: true, UpdatedBy: "admin", UpdatedByName: "admin", UpdatedDate: ""}
      }),
      console.log('sukiiii', this.state.selectedData)
    )) { return this.props.unselectSalesPlan(plan); }
    return this.props.selectSalesPlan(plan);
  };

  _renderTabs(){
    return (
      <>
        <PlanningDetailsTab
          {...this.props}
          // salesDataSelected={this.props.selectedSalesPlans.length}
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
          // value={this.state.lifetime}      
          totalSalesData={this.props.salesOrderList.TotalData}
          totalServiceData={this.props.serviceOrderList.TotalData}
          onClickTabHead={this.props.onClickSortBy}
          sortSalesByState={this.props.sortSalesBy}
          sortServiceByState={this.props.sortServiceBy}
          onPage={this._renderPagination}
          
        />
      </>
    );
  };

    render(){
      // console.log('ini seleceted parameter sales',this.props.selectedServicePlans);
      // console.log('data props',this.props)
      console.log('ahihihihihi :',this.state.isPaging)
      console.log('ahihihihihi :',this.state.selectedData)
        return(
            <main className="content">
              {this.handlePageSize()}
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