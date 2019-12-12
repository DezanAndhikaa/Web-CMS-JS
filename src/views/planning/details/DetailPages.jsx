import React from 'react'
import BaseButton from "../../../components/Button/BaseButton";
import Searchbar from "../../../components/Searchbar/SearchInput";
import FilterbyDataAction from '../../../components/FilterByDataAction/FilterbyDataAction';
import PlanningList from './components/PlanningList/PlanningList';
import './DetailPages.scss';

class DetailPages extends React.Component{
    state = {
        stats: true,
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
        selectedPlanningList: [],
        displayCheckbox: true
    }
    
    isChangeStat = () =>{
        this.setState({ stats: !this.state.stats})
        console.log("nilai mnilai : "+ this.state.stats)
    }

	_renderTableHeader(){
		return(
			<div className="plannings-list-container">
				<PlanningList
                    {...this.props}
                    {...this.state}
                    onChoosed={this.updateAssignmentStates}
                    planningList={this.state.planningList}
                    selectedPlanList={this.state.selectedPlanningList}
                    displayCheckbox={this.state.displayCheckbox}
                    onStats={this.isChangeStat}
				/>
			</div>
		);
    }

    updateAssignmentStates = (plan) => {
        if (this.state.selectedPlanningList.some(
          (plans) => plans.woNumber === plan.woNumber,
        )) { return this.props.unselectPlan(plan); }
        return this.props.selectPlan(plan);
    }

    render(){
        return(
            <main className="content">
                <div className="table-container">
                    <div>
                        <Searchbar /> &nbsp;&nbsp;&nbsp;&nbsp;
                        <FilterbyDataAction />
                        <br></br><br></br>
                        <BaseButton />
                    </div>
					{this._renderTableHeader()}
				</div>
            </main>
        )
    }
}

export default DetailPages;
