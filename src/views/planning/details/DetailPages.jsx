import React from 'react';
// import SaveButton from "../../../components/ActionButton/SaveButton/SaveButton";
// import EditButton from "../../../components/ActionButton/EditButton/EditButton";
import Searchbar from "../../../components/Searchbar/SearchInput";
import FilterbyDataAction from '../../../components/FilterByDataAction/FilterbyDataAction';
// import PlanningListHeader from './components/PlanningListHeader/PlanningListHeader';
import PlanningList from './components/PlanningList/PlanningList';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
// import {
//     ResetSelectedMechanicsAction, SelectCustomerFilterAction,
//     SelectPlansTypeFilterAction, SelectMechanicAction, SelectUnitModelFilterAction,
//     UnselectMechanicAction, ResetSelectedLeaderAction, SelectLeaderAction,
//   } from './DetailPages-action';

class DetailPages extends React.Component{
    state = {
        planningList: [
            {
            so: '00000',
            costumer: 'BUMA',
            site: 'TJG',
            unitModel: 'PC2000-8',
            compDesc: 'AXLE ASSY FRONT RIGHT',
            partNumber: '235-22-00131',
            unitCode: 'XXXX',
            serialNumber: 'XXXXX',
            lifetimeComp: 'XXXXX',
            planExecution: '17 December 2019'
            },
            {
                so: '00001',
                costumer: 'PAMA',
                site: 'JBY',
                unitModel: 'PC2000-8',
                compDesc: 'POWER MODULE',
                partNumber: '561-88-70301',
                unitCode: 'XXXX',
                serialNumber: 'XXXXX',
                lifetimeComp: 'XXXXX',
                planExecution: '12 April 2020'
            }
        ],
        selectedPlans: [],
        displayCheckbox: true
    }
    
	// _renderTableHeader(){
	// 	return(
	// 		<div className="plannings-list-container">
	// 			<PlanningList
    //                 {...this.props}
    //                 onChoosed={this.updateAssignmentStates}
    //                 planningList={this.state.planningList}
    //                 selectedPlanList={this.state.selectedPlans}
    //                 displayCheckbox={this.state.displayCheckbox}
    //                 // pushTo={this.props.pushTo}
	// 			/>
	// 		</div>
	// 	);
    // }

    _renderSalesOrderTabs(){
        return (
        <>
        <PlanningDetailsTab 
        {...this.props}
        onChoosed={this.updateAssignmentStates}
        planningList={this.state.planningList}
        selectedPlanList={this.state.selectedPlans}
        displayCheckbox={this.state.displayCheckbox}
        />
        </>
        );
    }

    _renderSearchBar(){
        return( <Searchbar > &nbsp;&nbsp;&nbsp;&nbsp;</Searchbar> ); }

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
                    <div className="filters-container">
                        <div className="search-container">
                            {this._renderSearchBar()}
                        </div>
                        {/* {this._renderFilterByDataAction()} */}
                    </div>
                <div className="table-container">
				    {this._renderSalesOrderTabs()}
				</div>
            </main>
        )
    }
}

export default DetailPages;
