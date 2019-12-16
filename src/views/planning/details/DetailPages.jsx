import React from 'react';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';

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
        selectedPlanList={this.state.selectedPlans}
        displayCheckbox={this.state.displayCheckbox}
        stats={this.state.stats}
        onStats={this.isChangeStat}
        />
        </>
        );
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
                    <div>
                        {this._renderSalesOrderTabs()}
                    </div>
                </div>
            </main>
        )
    }
}

export default DetailPages;
