import React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
import DropDownList from '../../../components/DropdownList/DropDownList';
// import { Base } from '../../../base-url';
import SalesDummy from '../../../../src/dummy.json';
import SearchInput from "../../../components/Searchbar/SearchInput";

class DetailPages extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        stats: true,
        selectedPlans: [],
        displayCheckbox: true,
        lifetime: SalesDummy,
        salesOrder: [],
        // nextPage: true,
        // prevPage: false,
        // numberOfPage: 2,
        // currentPage: 1,
        // filter: {
        //   filter : {}
        // }


    };
}

componentDidUpdate = (prevProps) => {
  if (prevProps.parameter !== this.props.parameter) {
    console.log('fetch berjalan')
    this.props.fetchSalesOrder(this.props.parameter);
  }
  if (prevProps.searchValue !== this.props.searchValue) {
    this.props.updateParameter({
      ...prevProps.parameter, searchValue: this.props.searchValue, PageNumber: 1,
    });
  }
  console.log('ini selected service',this.props.selectedServicePlans)
  console.log('ini selected sales',this.props.selectedSalesPlans)
}

// componentDidMount = async () => {
//   console.log('fetch berjalan didmount')
//   await this.props.fetchSalesOrder(this.props.parameter);
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
      console.log(this.props)
      const web = this.props.displayMode === 'web';
      const next = this.props.serviceOrderList.NextPage;
      const prev = this.props.serviceOrderList.PrevPage;
      const currentProps = this.props.serviceOrderList.PageNumber;
      const { TotalPage } = this.props.serviceOrderList;
      return(
        <div className="pagination">
          <div className="paging">
            {prev && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
            {web && currentProps - 3 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 3 })} className="page-inactive">{currentProps - 3}</div>}
            {web && currentProps - 2 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 2 })} className="page-inactive">{currentProps - 2}</div>}
            {currentProps - 1 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 1 })} className="page-inactive">{currentProps - 1}</div>}
            <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps })} className="page-active">{currentProps}</div>
            {currentProps + 1 <= TotalPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 1 })} className="page-inactive">{currentProps + 1}</div>}
            {web && currentProps + 2 < TotalPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 2 })} className="page-inactive">{currentProps + 2}</div>}
            {web && currentProps + 3 < TotalPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 3 })} className="page-inactive">{currentProps + 3}</div>}
            {next && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
          </div>
        </div>
      )
    }

    onClickServiceOrder = () => {
      this.props.getServiceOrder();
      // console.log('ini data dari api',this.props.serviceOrderList);
    }

    onClickSalesOrder = () =>{
      this.props.fetchSalesOrder(this.props.parameter);
      console.log('ini data parameter',JSON.stringify(this.props.parameter.soFilter));
      console.log('ini data dari api',this.props.salesOrderList);
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
    
    isChangeStat = (value,key) =>{
        console.log('nilai value kiriman : '+value)
        console.log('nilai key kiriman : '+key)
        this.setState({
          lifetime: { salesData :this.state.lifetime.salesData.map(el => (el.SO === key ? {...el, LifeTimeComp : value} : el)) }
        });
    }

    updateAssignmentServiceStates = (plan) => {
      if (this.props.selectedServicePlans.some(
        (plans) => plans.Wo === plan.Wo,
      )) { return this.props.unselectServicePlan(plan); }
      return this.props.selectServicePlan(plan);
  }

  updateAssignmentSalesStates = (plan) => {
    if (this.props.selectedSalesPlans.some(
      (plans) => plans.SO === plan.SO,
    )) { return this.props.unselectSalesPlan(plan); }
    return this.props.selectSalesPlan(plan);
}

    _renderTabs(){
      return (
        <>
        <PlanningDetailsTab
        {...this.props}
        renderSearch={this._renderSearchBar()}
        onClickSalesOrder={this.onClickSalesOrder}
        parameter={this.props.parameter}
        onClickServiceOrder={this.onClickServiceOrder}
        onChoosedService={this.updateAssignmentServiceStates}
        onChoosedSales={this.updateAssignmentSalesStates}
        selectedSalesPlanList={this.props.selectedSalesPlans}
        selectedServicePlanList={this.props.selectedServicePlans}
        displayCheckbox={this.props.parameter.assigmentFilter
          || this.props.parameter.inProgressFilter}
        stats={this.state.stats}
        onStats={this.isChangeStat}
        value={this.state.lifetime}
        dataSalesOrder={this.state.salesOrder}
        totalSalesData={this.props.salesOrderList.TotalData}
        />
        </>
      );
    }

    _renderShowPerPage(){
      return(
        <DropDownList />
      )
    }

    render(){
        console.log(this.state.lifetime);
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