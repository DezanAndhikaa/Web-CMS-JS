import React from 'react';
import{ 
  Button, 
  TextField, 
  Table, 
  TableHead, 
  TableRow, 
  TableBody, 
  TableCell, 
  FormLabel } 
from '@material-ui/core';
import './SapIssuePages.scss';
import moment from 'moment';
import { Menu } from '../../../../../constants';

class SapIssuePages extends React.PureComponent {
  state={
    whichTabs: true,
    description: [],
    sapIssue: []
  }

  handleChange(id, e) {
    this.setState({
      description: { ...this.state.description, [id]: e.target.value },
      sapIssue: { ...this.state.sapIssue, [id]: e.target.value}
    });
  }

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
  }

  _showTableHead() {
    return (
      <TableHead className="table-head-sap" >
        <TableRow className="table-row-header">
          {this.state.whichTabs ? 
            <TableCell className="table-cell-left">SO</TableCell> : 
            <TableCell className="table-cell-left">WO</TableCell>}
          <TableCell className="table-cell-sap">Customer</TableCell>
          <TableCell className="table-cell-sap">Site</TableCell>
          <TableCell className="table-cell-sap">Unit Model</TableCell>
          <TableCell className="table-cell-sap">Component Description</TableCell>
          <TableCell className="table-cell-sap">Part Number</TableCell>
          <TableCell className="table-cell-sap">Unit Code</TableCell>
          <TableCell className="table-cell-sap">Serial Number</TableCell>
          <TableCell className="table-cell-sap">Lifetime Comp</TableCell>
          <TableCell className="table-cell-sap">Plan Execution</TableCell>
          {this.state.whichTabs ? 
            <>
              <TableCell className="table-cell-sap">SMR</TableCell>
              <TableCell className="table-cell-right">SMR Date</TableCell>
            </>:
            null
          }
        </TableRow>
      </TableHead>
    )
  }

  _showTableBody(row) {
      return (
        <>
        <TableRow className="table-row-body">
          {this.state.whichTabs ?
            <TableCell align="left" className="table-cell-left"> {row.SoNumber} </TableCell> : 
            <TableCell align="left" className="table-cell-left"> {row.WoNumber} </TableCell>
          }
          <TableCell align="left" className="table-cell-sap"> {row.CustomerName} </TableCell>
          <TableCell align="left" className="table-cell-sap"> {row.SiteCode} </TableCell>
          <TableCell align="left" className="table-cell-sap"> {row.UnitModel} </TableCell>
          <TableCell align="left" className="table-cell-sap"> {row.ComponentDescription} </TableCell>
          <TableCell align="left" className="table-cell-sap"> {row.PartNumber} </TableCell>
          <TableCell align="left" className="table-cell-sap"> {row.UnitCode} </TableCell>
          <TableCell align="left" className="table-cell-sap"> {row.SerialNumber} </TableCell>
          <TableCell align="center" className="table-cell-sap"> {row.LifeTimeComponent}</TableCell>
          <TableCell align="left" className="table-cell-sap"> {moment(row.PlanExecution).format('DD-MM-YYYY')} </TableCell>
          {this.state.whichTabs ?
            <>
                <TableCell align="center" className="table-cell-sap"> {row.SMR} </TableCell>
                <TableCell align="left" className="table-cell-right"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
            </> : 
            null
          }
        </TableRow>
        <TableRow className="table-row-body">
          <TableCell colSpan="12" className="table-cell-sap">{this._showHeaderDesc()}</TableCell>
        </TableRow>
      </>
    )
  }

  _showHeaderDesc(id){
    return(
      <div className="tag-container">
        <div className="btn-container">
          {this.state.whichTabs ?
            <Button className="btn-reason" id="so">SO</Button> :
            <Button className="btn-reason" id="wo">WO</Button>}
          <Button className="btn-reason" id="cust">Customer</Button>
          <Button className="btn-reason" id="site">Site</Button>
          <Button className="btn-reason" id="unitModel">Unit Model</Button>
          <Button className="btn-reason" id="compDesc">Component Description</Button>
          <Button className="btn-reason" id="partNumber">Part Number</Button>
          <Button className="btn-reason" id="unitCode">Unit Code</Button>
          <Button className="btn-reason" id="sn">Serial Number</Button>
          <Button className="btn-reason" id="planExec">Plan Execution</Button>
          {this.state.whichTabs ?
            <>
              <Button className="btn-reason" id="smr">SMR</Button>
              <Button className="btn-reason" id="smrDate">SMR Date</Button> 
            </> : ""
          }
        </div>
        <div className="desc-container">
          <FormLabel className="input-label">Description: </FormLabel>
          <TextField 
            type="text"
            variant="outlined"
            className="input-description"
            placeholder="Silahkan perbaiki SAP sekarang !!"
            size="small"
            value={this.state.description[id]} 
            name={this.state.description[id]} 
            onChange={this.handleChange.bind(this, id)} 
          />
        </div>
      </div>
    )
  }

  _sendSap =  async( description) => {
    const index = this.props.selectedDataSAP.length
    let arr = []
    if(this.props.whichTabs){
      for(let i=0; i<index; i++){
        arr = [...arr,{NumberOrder: this.props.selectedDataSAP[i].SoNumber, Message: description[i]}]
      }
    }else{
      for(let i=0; i<index; i++){
        arr = [...arr,{NumberOrder: this.props.selectedDataSAP[i].WoNumber, Message: description[i]}]
      }
    }
    this.setState({
      SAPIssue: arr
    },
    () => this.isSAPIssue(arr) 
    )
  }

  _renderPagination= (pageValue) =>  {
    if (pageValue === 1) {
      this.setState({whichTabs : true})
    }if (pageValue === 0) {
      this.setState({whichTabs : false})
    }
    if (this.state.whichTabs === true) {
      const web = this.props.displayMode === 'web';
      // const nextSalesRev = this.props.salesOrderRevised.NextPage;
      // const prevSalesRev = this.props.salesOrderRevised.PrevPage;
      const currentPropsRev = this.props.salesOrderRevised.PageNumber;
      const { TotalPages } = this.props.salesOrderRevised;
      
      return(
        <div className="paginations-rev">
          <div className="paging-rev">
            {/* {prevSalesRev && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
            {web && currentPropsRev - 3 > 0 && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev - 3 })} className="page-inactive-rev">{currentPropsRev - 3}</div>}
            {web && currentPropsRev - 2 > 0 && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev - 2 })} className="page-inactive-rev">{currentPropsRev - 2}</div>}
            {currentPropsRev - 1 > 0 && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev - 1 })} className="page-inactive-rev">{currentPropsRev - 1}</div>}
            <div className="page-active-rev">{currentPropsRev}</div>
            {currentPropsRev + 1 <= TotalPages && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev + 1 })} className="page-inactive-rev">{currentPropsRev + 1}</div>}
            {web && currentPropsRev + 2 < TotalPages && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev + 2 })} className="page-inactive-rev">{currentPropsRev + 2}</div>}
            {web && currentPropsRev + 3 < TotalPages && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev + 3 })} className="page-inactive-rev">{currentPropsRev + 3}</div>}
            {/* {nextSalesRev && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
          </div>
        </div>
      )
    }
  }

  _renderIssue(){
    return(
      <div className="planning-list-sap">
          <Table classes={{ root: 'table' }} className="table-sap">
            {this._showTableHead()}
            <TableBody classes={{ root: 'table-body' }} className="table-body-sap">
              {this.props.selectedSalesPlans
                && this.props.selectedSalesPlans.map((row, id) => (this._showTableBody(row,id)) )
              }
            </TableBody>
          </Table>
      </div>
    )
  }

  render(){
    return(
      <main className="content" >
        <div className="header-container">
          <Button className="btn-back-to-approval" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL) }>
              Approval
          </Button>
        </div>
        <div className="table-container-sap">
          <div className="title-containers">
            <div className="title">
                SAP Issue
            </div>						
            <Button className="btn-send-sap" onClick={this._sendSap}>Send SAP Issue</Button>
          </div>
          <>
            {this._renderIssue()}
          </>
        </div>
      </main>
    );
  }
}

export default SapIssuePages;