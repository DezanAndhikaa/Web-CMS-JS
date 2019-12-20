import React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
import DropdownFilter from '../../../components/FilterByTitle/DropdownFilter';
import { Base } from '../../../base-url'

class DetailPages extends React.Component{
    constructor(props) {
        super(props)
    this.state = {
        stats: true,
        selectedPlans: [],
        displayCheckbox: true,
        lifetime: [],
        salesOrder: [],
        nextPage: true,
        prevPage: false,
        numberOfPage: 2,
        currentPage: 1,
        filter: {
          filter : {}
        }


    };
}

    componentDidMount(){
      // const data = JSON.stringify(this.state.filter)
      // console.log('testing',this.props)
      

        // console.log("narik data sales order ")
        // fetch('http://10.200.201.164:5000/v1/Planning/ServiceOrder/MasterData')
        // .then((res) => {
        //   console.log('ini data dari res', res)
        //   if(res.status === 200){
        //   return res.json()
        //   }
        //   })
        //   .then( resJson => {
        //     this.setState({ salesOrder: resJson})
        //   })
        //   console.log('data dari api',this.state.salesOrder)
            }
    

    _renderPagination() {
        console.log(this.props)
        const web = this.props.displayMode === 'web';
        const next = this.state.nextPage;
        const prev = this.state.prevPage;
        const currentProps = this.state.currentPage;
        const { numberOfPage } = this.state;
    return(
        <div className="pagination">
        <div className="paging">
          {prev && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
          {web && currentProps - 3 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 3 })} className="page-inactive">{currentProps - 3}</div>}
          {web && currentProps - 2 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 2 })} className="page-inactive">{currentProps - 2}</div>}
          {currentProps - 1 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 1 })} className="page-inactive">{currentProps - 1}</div>}
          <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps })} className="page-active">{currentProps}</div>
          {currentProps + 1 <= numberOfPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 1 })} className="page-inactive">{currentProps + 1}</div>}
          {web && currentProps + 2 < numberOfPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 2 })} className="page-inactive">{currentProps + 2}</div>}
          {web && currentProps + 3 < numberOfPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 3 })} className="page-inactive">{currentProps + 3}</div>}
          {next && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
        </div>
      </div>
    )
    
    }


    onClickServiceOrder = () => {
      this.props.getServiceOrder();
      console.log('ini data dari api',this.props.serviceOrderList);
    }

    onClickSalesOrder = () =>{
      this.props.getSalesOrder();
      console.log('ini data dari api',this.props.salesOrderList);
    }

    
    isChangeStat = (value) =>{
        console.log('nilai value kiriman : '+value)
        this.setState({ 
            stats: !this.state.stats,
            lifetime: [...this.state.lifetime, value]
        })
        console.log('ke pencet', this.state.lifetime)
        console.log("nilai mnilai : "+ this.state.stats)
    }

    _renderSalesOrderTabs(){
        return (
        <>
        <PlanningDetailsTab
        {...this.props}
        onClickSalesOrder={this.onClickSalesOrder}
        onClickServiceOrder={this.onClickServiceOrder}
        onChoosed={this.updateAssignmentStates}
        selectedPlanList={this.state.selectedPlans}
        displayCheckbox={this.state.displayCheckbox}
        stats={this.state.stats}
        onStats={this.isChangeStat}
        value={this.state.lifetime}
        dataSalesOrder={this.state.salesOrder}
        />
        </>
        );
    }

    updateAssignmentStates = (plan) => {
        if (this.state.selectedPlans.some(
          (plans) => plans.SerialNumber === plan.SerialNumber,
        )) { return this.props.unselectPlan(plan); }
        return this.props.selectPlan(plan);
    }

    _renderFilter() {
        return (
          <div className="dropdowns-container">
            <div className="dropdown-container">
              <DropdownFilter
                // data={this.props.reportList.jobTypeFilter}
                // selected={this.props.selectedFilters.jobType}
                // onSelectActionType={SelectJobsTypeFilterAction}
                // onSelectAction={this.props.selectFilter}
              />
            </div>
            <div className="dropdown-container">
              <DropdownFilter
                // data={this.props.reportList.unitModelFilter}
                // selected={this.props.selectedFilters.unitModel}
                // onSelectActionType={SelectUnitModelFilterAction}
                // onSelectAction={this.props.selectFilter}
              />
            </div>
            <div className="dropdown-container">
              <DropdownFilter
                // data={this.props.reportList.customerFilter}
                // selected={this.props.selectedFilters.customer}
                // onSelectActionType={SelectCustomerFilterAction}
                // onSelectAction={this.props.selectFilter}
              />
            </div>
            <div className="dropdown-container">
              <DropdownFilter
                // data={this.props.reportList.customerFilter}
                // selected={this.props.selectedFilters.customer}
                // onSelectActionType={SelectCustomerFilterAction}
                // onSelectAction={this.props.selectFilter}
              />
            </div>
            {/* {this.props.displayMode === "web" && (
              <div className="search-container">{this.renderSearchInput()}</div>
            )} */}
          </div>
        );
    }

    render(){
      console.log('data props',this.props)
        return(
            <main className="content">
                <div className="table-container">
                      {this._renderSalesOrderTabs()}
                  </div>
                  <div className="bottom-row">
                      {this._renderPagination()}
                  </div>
            </main>
        )
    }
}

export default DetailPages;
