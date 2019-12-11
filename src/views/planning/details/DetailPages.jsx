import React  from 'react';
import PlanningListHeader from './components/PlanningListHeader/PlanningListHeader';
import PlanningList from './components/PlanningList/PlanningList';
import './DetailPages.scss'

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
        selectedPlanningList: [],
        displayCheckbox: true
        // selectPlan: []
    }
    
	_renderTableHeader(){
		return(
			<div className="plannings-list-container">
				<PlanningList
                    {...this.props}
                    onChoosed={this.updateAssignmentStates}
                    planningList={this.state.planningList}
                    selectedPlanList={this.state.selectedPlanningList}
                    displayCheckbox={this.state.displayCheckbox}
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
	// renderPagination() {
	// 	const web = this.props.displayMode === 'web';
	// 	const next = this.props.jobsData.nextPage;
	// 	const prev = this.props.jobsData.prevPage;
	// 	const currentProps = this.props.jobsData.currentPage;
	// 	const { numberOfPage } = this.props.jobsData;
	// 	return (
	// 		<div className="pagination">
	// 			<div className="paging">
	// 				{prev && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
	// 				{web && currentProps - 3 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 3 })} className="page-inactive">{currentProps - 3}</div>}
	// 				{web && currentProps - 2 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 2 })} className="page-inactive">{currentProps - 2}</div>}
	// 				{currentProps - 1 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 1 })} className="page-inactive">{currentProps - 1}</div>}
	// 				<div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps })} className="page-active">{currentProps}</div>
	// 				{currentProps + 1 <= numberOfPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 1 })} className="page-inactive">{currentProps + 1}</div>}
	// 				{web && currentProps + 2 < numberOfPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 2 })} className="page-inactive">{currentProps + 2}</div>}
	// 				{web && currentProps + 3 < numberOfPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 3 })} className="page-inactive">{currentProps + 3}</div>}
	// 				{next && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
	// 			</div>
	// 		</div>
	// 	);
	// }

	render(){
		return(
			<main className="content">
				<div className="table-container">
					{this._renderTableHeader()}
				</div>
			</main>
			// <main className="content">
			// 	{this._renderTableHeader()}
			// 	<SaveButton/>
			// 	<br></br>
			// 	<EditButton/>
			// </main>
		);
	}
}

export default DetailPages;
