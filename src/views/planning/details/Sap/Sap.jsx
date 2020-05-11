import React from 'react';
import { Button, Modal, TextField, Table, TableHead, TableRow, TableBody, TableCell, Paper, FormLabel } from '@material-ui/core';
import './Sap.scss';
import moment from 'moment';

export default class Sap extends React.PureComponent {
    state={
        description: [],
        sapIssue: []
    }

    handleChange(id, e) {
      this.setState({
        description: { ...this.state.description, [id]: e.target.value },
        sapIssue: { ...this.state.sapIssue, [id]: e.target.value}
      });
    }

    _showTableHead() {
      return (
        <TableHead className="table-head-issue" >
          <TableRow className="table-row-top-issue">
            {this.props.whichTabs ? 
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
            {this.props.whichTabs ? 
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
          <TableRow className="table-row-top-issue">
            {this.props.whichTabs ?
              <TableCell align="left" className="table-cell-issue"> {row.SoNumber} </TableCell> : 
              <TableCell align="left" className="table-cell-issue"> {row.WoNumber} </TableCell>
            }
            <TableCell align="left" className="table-cell-issue"> {row.CustomerName} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.SiteCode} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.UnitModel} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.ComponentDescription} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.PartNumber} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.UnitCode} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.SerialNumber} </TableCell>
            <TableCell align="center" className="table-cell-issue"> {row.LifeTimeComponent}</TableCell>
            <TableCell align="left" className="table-cell-issue"> {moment(row.PlanExecution).format('DD-MM-YYYY')} </TableCell>
            {this.props.whichTabs ?
              <div>
                  <TableCell align="left" className="table-cell-issue"> {row.SMR} </TableCell>
                  <TableCell align="left" className="table-cell-issue"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
              </div> : 
              null
            }
          </TableRow>
          <TableRow className="table-row-bottom-issue">
            <TableCell colSpan="12" className="table-cell-bottom">{this._showHeaderDesc()}</TableCell>
          </TableRow>
          <TableRow className="table-row-bottom-issue">
            <TableCell><label>Description :</label></TableCell>
            <TableCell colSpan="11">{this._showDescription(id)}</TableCell>
          </TableRow>
        </>
      )
    }

    _showHeaderDesc(){
      return(
        <div className="teks">
          <div className="header">Please pick a mistake on the SAP</div>
          {this.props.whichTabs ?
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
          {this.props.whichTabs ?
            <>
                <Button className="btn-reason" id="smr">SMR</Button>
                <Button className="btn-reason" id="smrDate">SMR Date</Button> 
            </> : ""
          }
          <FormLabel>Description :</FormLabel>
        </div>
      )
    }

    _showDescription(id){
      return(
        <div className="teks">
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
                {this.props.selectedDataSAP
                    && this.props.selectedDataSAP.map((row, id) => (this._showTableBody(row,id)) )
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
                <div className="table-containers">
                    <div className="title-containers">
                        <div className="title">
                            SAP Issue
                        </div>						
                        <Button className="btn-send-sap" variant="outlined" onClick={this.isClicked}>Send SAP Issue</Button>
                    </div>
                    <div>
                        {this._renderIssue()}
                    </div>
                </div>
            </main>
        );
    }
}