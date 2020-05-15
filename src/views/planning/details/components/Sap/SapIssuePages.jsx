import React from 'react';
import { Button, TextField, Table, TableHead, TableRow, TableBody, TableCell, Paper, FormLabel } from '@material-ui/core';
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
        <TableRow className="table-row-top-sap">
          {this.state.whichTabs ? 
            <TableCell>SO</TableCell> : 
            <TableCell>WO</TableCell>}
          <TableCell>Customer</TableCell>
          <TableCell>Site</TableCell>
          <TableCell>Unit Model</TableCell>
          <TableCell>Component &nbsp; Description</TableCell>
          <TableCell>Part &nbsp; Number</TableCell>
          <TableCell>Unit &nbsp; Code</TableCell>
          <TableCell>Serial &nbsp; Number</TableCell>
          <TableCell>Lifetime</TableCell>
          <TableCell>Plan</TableCell>
          {this.state.whichTabs ? 
            <div>
              <TableCell>SMR</TableCell>
              <TableCell>SMR &nbsp;Date</TableCell>
            </div>:
            null
          }
        </TableRow>
      </TableHead>
    )
  }

  _showTableBody(row, id) {
      return (
        <>
        <TableRow className="table-row-top-sap">
          {this.state.whichTabs ?
            <TableCell align="left" className="table-cell-sap"> {row.SoNumber} </TableCell> : 
            <TableCell align="left" className="table-cell-sap"> {row.WoNumber} </TableCell>
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
            <div>
                <TableCell align="left" className="table-cell-sap"> {row.SMR} </TableCell>
                <TableCell align="left" className="table-cell-sap"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
            </div> : 
            null
          }
        </TableRow>
        <TableRow className="table-row-bottom-sap">
          <TableCell colSpan="12" className="table-cell-sap">{this._showHeaderDesc()}</TableCell>
        </TableRow>
        <TableRow className="table-row-bottom-sap">
          <TableCell><label>Description :</label></TableCell>
          <TableCell colSpan="11">{this._showDescription(id)}</TableCell>
        </TableRow>
      </>
    )
  }

  _showHeaderDesc(){
    return(
      <div className="tag-container">
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
    )
  }

  _showDescription(id){
    return(
      <div className="tag-container">
        <TextField 
          type="text"
          className="input-description"
          placeholder="Silahkan perbaiki SAP sekarang !!"
          size="small"
          value={this.state.description[id]} 
          name={this.state.description[id]} 
          onChange={this.handleChange.bind(this, id)} 
        />
      </div>
    )
  }

  _renderIssue(){
    return(
      <div className="planning-list-sap">
          <Table size="small" component={Paper}>
              {this._showTableHead()}
              <TableBody>
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
            <Button className="btn-send-sap" onClick={this.isClicked}>Send SAP Issue</Button>
          </div>
          <div>
            {this._renderIssue()}
          </div>
        </div>
      </main>
    );
  }
}

export default SapIssuePages;