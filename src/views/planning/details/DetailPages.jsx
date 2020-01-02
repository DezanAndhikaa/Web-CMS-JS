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
        selectedPlans: [],
        displayCheckbox: true,
        // lifetime: SalesDummy,
        lifetime: this.props.salesOrderList.Lists,
        salesOrder: [],
        isShowAssign: false,
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

  this.props.updateParameter({
    ...this.props.salesParameter, Search: '',
  });
}

componentDidUpdate = (prevProps) => {
  // console.log('fetch berjalan', this.props.salesParameter)
  if (prevProps.salesParameter !== this.props.salesParameter) {
    console.log('fetch berjalan', this.props.salesParameter)
    this.props.fetchServiceOrder(this.props.salesParameter.dataFilter)
    this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
  }
  if (prevProps.Search !== this.props.Search) {
    this.props.updateSalesParameter({
      ...prevProps.salesParameter.dataFilter, Search: this.props.Search, PageNumber: 1,
    });
  }console.log('data filter terupdate', this.props.salesParameter )
  if (prevProps.requestAssignSales !== this.props.requestAssignSales
    // || prevProps.requestUnassignJobs !== this.props.requestUnassignJobs
    ) {
    this.props.clearSelectedSalesPlans({});
    this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
  }
  // console.log('ini selected service',this.props.selectedServicePlans)
  // console.log('ini selected sales',this.props.selectedSalesPlans)
}

onClickApproveBtn = () => {
  // this.props.getMechanics(this.props.token);
  this.setState({ isShowAssign: true });
}

  // componentDidMount = async () => {
  //   console.log('fetch berjalan didmount')
    
  //   // this.onClickSalesOrder();
  // }

  // componentDidMount = async() =>{
  //   // console.log("narik data sales order ")
  //   // console.log(this.state.lifetime)
  //   // console.log('testing',this.props)
  //   // this.props.getServiceOrder()
  //     // console.log("narik data sales order ")
  //     // fetch('http://10.200.201.164:5000/v1/Planning/ServiceOrder/MasterData')
  //     // .then((res) => {
  //     //   console.log('ini data dari res', res)
  //     //   if(res.status === 200){
  //     //   return res.json()
  //     //   }
  //     //   })
  //     //   .then( resJson => {
  //     //     this.setState({ salesOrder: resJson})
  //     //   })
  //     //   console.log('data dari api',this.state.salesOrder)
  // }
  
  _renderPagination() {
    // console.log('ini data untuk paging',this.props.salesOrderList)
    const web = this.props.displayMode === 'web';
    const nextSales = this.props.salesOrderList.NextPage;
    const prevSales = this.props.salesOrderList.PrevPage;
    const currentPropsSales = this.props.salesOrderList.PageNumber;
    const { TotalPage } = this.props.salesOrderList;
    
    return(
      <div className="pagination">
        <div className="paging">
          {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter.Filter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
          {web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter.Filter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
          {web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter.Filter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
          {currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter.Filter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
          <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter.Filter, PageNumber: currentPropsSales })} className="page-active">{currentPropsSales}</div>
          {currentPropsSales + 1 <= TotalPage && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter.Filter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
          {web && currentPropsSales + 2 < TotalPage && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter.Filter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
          {web && currentPropsSales + 3 < TotalPage && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter.Filter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
          {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter.Filter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
        </div>
      </div>
    )
  }
  

    onClickServiceOrder = () => {
      this.props.fetchServiceOrder(this.props.salesParameter.dataFilter);
      // console.log('ini data dari api',this.props.serviceOrderList);
    }

    onClickSalesOrder = () =>{
      console.log('ini filter paging ', this.props.salesParameter.dataFilter )
      this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
      // console.log('ini data parameter',JSON.stringify(this.props.salesParameter.soFilter));
      // console.log('ini data dari api',this.props.salesOrderList);
      // console.log('ini data pilihan dari marinka : ', this.props.salesOrderList.GroupSo)
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

  _renderBaseButton() {
    if (this.props.salesParameter.paramsData.assigmentFilter) {
      return(
				<div className="bottom-row">
          <BaseButton titles="Delete"/>
					<BaseButton titles="Download"
            disabled={this.props.selectedSalesPlans.length < 1 || this.props.selectedSalesPlans.some((plans) => plans.status === 'Approved')} 
            className="btn-assign" onClick={this.onClickApproveBtn} />
          <BaseButton titles="Approve"/>
        </div>
      );
    }
  }
    
    isChangeStat = (value,key) =>{
        console.log('nilai value kiriman : '+value)
        console.log('nilai key kiriman : '+key)
        console.log('nilai nilai props : ',this.state.lifetime)
        this.setState({
          lifetime: { Lists :this.state.lifetime.Lists.map(el => (el.SO === key ? {...el, LifeTimeComp : value} : el)) }
        });
    }

  updateAssignmentServiceStates = (plan) => {
    if (this.props.selectedServicePlans.some(
      (plans) => plans.Wo === plan.Wo,
    )) { return this.props.unselectServicePlan(plan); }
    return this.props.selectServicePlan(plan);
  };

  updateAssignmentSalesStates = (plan) => {
    if (this.props.selectedSalesPlans.some(
      (plans) => plans.SO === plan.SO,
    )) { return this.props.unselectSalesPlan(plan); }
    return this.props.selectSalesPlan(plan);
  };

  _renderTabs(){
    return (
      <>
        <PlanningDetailsTab
          {...this.props}
          renderBaseButton={this._renderBaseButton()}
          renderSearch={this._renderSearchBar()}
          onClickSalesOrder={this.onClickSalesOrder}
          parameter={this.props.parameter}
          onClickServiceOrder={this.onClickServiceOrder}
          // onSearchValue={this.onSearchValue}
          onChoosedService={this.updateAssignmentServiceStates}
          onChoosedSales={this.updateAssignmentSalesStates}
          selectedSalesPlanList={this.props.selectedSalesPlans}
          selectedServicePlanList={this.props.selectedServicePlans}
          displayCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
          stats={this.state.stats}
          onStats={this.isChangeStat}
          value={this.state.lifetime}
          dataSalesOrder={this.state.salesOrder}
          totalSalesData={this.props.salesOrderList.TotalData}
          totalServiceData={this.props.serviceOrderList.TotalData}
        />
      </>
    );
  };

  _renderShowPerPage(){
    return(
      <DropDownList />
    )
  }

    render(){
      //   console.log(this.state.lifetime);
      console.log('data props',this.props)
        return(
            <main className="content">
              {/* {this._renderSearchBar()} */}
                <div className="table-container">
                      {this._renderTabs()}
                  </div>
                  <div className="bottom-row">
                      {this._renderShowPerPage()} {this._renderPagination()}
                  </div>
            </main>
        )
    }
  }


export default DetailPages;