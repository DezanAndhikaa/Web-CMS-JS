import React from 'react';
import Searchbar from "../../../components/Searchbar/SearchInput";
import FilterbyDataAction from '../../../components/FilterByDataAction/FilterbyDataAction';
import PlanningList from './components/PlanningList/SalesOrderList';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
import BaseButton from '../../../components/Button/BaseButton';

class DetailPages extends React.Component{
    state = {
        stats: true,
        selectedPlans: [],
        displayCheckbox: true
    }
    
    isChangeStat = () =>{
        this.setState({ stats: !this.state.stats})
        console.log("nilai mnilai : "+ this.state.stats)
    }

    _renderSalesOrderTabs(){
        return (
        <>
        <PlanningDetailsTab
        {...this.props}
        onChoosed={this.updateAssignmentStates}
        // planningList={this.state.planningList}
        selectedPlanList={this.state.selectedPlans}
        displayCheckbox={this.state.displayCheckbox}
        stats={this.state.stats}
        onStats={this.isChangeStat}
        />
        </>
        );
    }

    _renderSearchBar(){
        return( <Searchbar > &nbsp;&nbsp;&nbsp;&nbsp;</Searchbar> ) }

    _renderFilterByDataAction(){
        return(
        <div className="dropdowns-container">
            <div className="dropdown-container">
                <FilterbyDataAction />
            </div>
        </div>
        )
    }

    updateAssignmentStates = (plan) => {
        if (this.state.selectedPlans.some(
          (plans) => plans.woNumber === plan.woNumber,
        )) { return this.props.unselectPlan(plan); }
        return this.props.selectPlan(plan);
    }

    render(){
        return(
            <main className="content">
                <div className="table-container">
                    <div className="filters-container">
                        <div className="search-container">
                            {this._renderSearchBar()}
                        </div>
                    </div>
                    <div>
                        {this._renderSalesOrderTabs()}
                    </div>
                </div>
            </main>
        )
    }
}

export default DetailPages;
