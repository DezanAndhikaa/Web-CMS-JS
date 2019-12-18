import React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';

class DetailPages extends React.Component{
    constructor(props) {
        super(props)
    this.state = {
        stats: true,
        selectedPlans: [],
        displayCheckbox: true,
        // inputLifetime: '',
        lifetime: '',
        nextPage: true,
        prevPage: false,
        numberOfPage: 2,
        currentPage: 1,


    };
}

    // isClick = () =>{
    //     console.log('ke pencet')
    //     this.setState({
    //         stats: !this.state.stats, 
    //         lifetime: this.state.inputLifetime
    //     })
    // }

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
        // lifetime={this.state.lifetime}
        // diklik={this.isClick}
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

    render(){
        return(
            <main className="content">
                <div className="table-container">
                    <div>
                        {this._renderSalesOrderTabs()}
                    </div>
                    <div className="bottom-row">
                        {this._renderPagination()}
                    </div>
                </div>
            </main>
        )
    }
}

export default DetailPages;
