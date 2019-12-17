import React from 'react';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
import DropdownFilter from '../../../components/FilterByTitle/DropdownFilter';

class DetailPages extends React.Component{
    state = {
        stats: true,
        selectedPlans: [],
        displayCheckbox: true,
        lifetime: ''
    }
    
    isChangeStat = (value) =>{
        this.setState({ 
            stats: !this.state.stats,
            lifetime: value
        })
        console.log('ke pencet', this.state.lifetime)
        console.log("nilai mnilai : "+ this.state.stats)
    }

    _renderSalesOrderTabs(){
        return (
            <>
                <PlanningDetailsTab
                    {...this.props}
                    onChoosed={this.updateAssignmentStates}
                    selectedPlanList={this.state.selectedPlans}
                    displayCheckbox={this.state.displayCheckbox}
                    stats={this.state.stats}
                    onStats={this.isChangeStat}
                    value={this.state.lifetime}
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
        return(
            <main className="content">
                <div className="table-container">
                    {/* <div className="filters-container">{this._renderFilter()}</div> */}
                    {/* <div> */}
                        {this._renderSalesOrderTabs()}
                    {/* </div> */}
                </div>
            </main>
        )
    }
}

export default DetailPages;
