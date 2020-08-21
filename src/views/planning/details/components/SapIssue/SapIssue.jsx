import React from 'react';
import { Button, Modal, TextField,Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@material-ui/core';
import './SapIssue.scss';
import CloseButton from '../../../../../components/CloseButton/CloseButton';
import moment from 'moment';

export default class SapIssue extends React.Component{

  state={
      isShowModal: false,
      description: [],
      SAPIssue: []
  }

  handleChange(id, e) {
    this.setState({
      description: { ...this.state.description, [id]: e.target.value },
    });
  }

  _showTableHead() {
      return (
        <TableHead className="table-head-issue" >
        <TableRow className="table-row-issue">
          <TableCell>WO</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Site</TableCell>
          <TableCell>Unit Model</TableCell>
          <TableCell>Component Description</TableCell>
          <TableCell>Part Number</TableCell>
          <TableCell>Unit Code</TableCell>
          <TableCell>Serial Number</TableCell>
          <TableCell>Lifetime</TableCell>
          <TableCell>Plan</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  _showTableBody(row, id) {
      return (
        <>
        <TableRow className="table-row-issue">
          <TableCell align="left" className="table-cell-issue"> {row.WoNumber} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.CustomerName} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.SiteCode} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.UnitModel} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.ComponentDescription} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.PartNumber} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.UnitCode} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.SerialNumber} </TableCell>
          <TableCell align="center" className="table-cell-issue"> {row.LifeTimeComponent}</TableCell>
          <TableCell align="left" className="table-cell-issue"> {moment(row.PlanExecution).format('DD-MM-YYYY')} </TableCell>
        </TableRow>
        <TableRow className="table-row-bottom-issue">
          <TableCell colSpan="1"><label>Description<label className="label-required">*</label></label></TableCell>
          <TableCell colSpan="11">{this._showDescription(id)}</TableCell>
        </TableRow>
      </>
    )
  }

  _showDescription(id){
    return(
      <div className="teks">
        <TextField 
            className="teks"
            type='text' 
            placeholder="Tuliskan Masalahnya yaa.."
            variant="outlined" 
            size="small"
            value={this.state.description[id]} 
            name={this.state.description[id]} 
            onChange={this.handleChange.bind(this, id)} 
        />
      </div>
    )
  }

  isDisabled() { return this.state.description.length === 0 }

  _renderIssue(){
    return(
      <div className="assign-mechanic-modal-issue">
        <div className="container-issue">
          <div className="top-row-issue">
            <div className="top-button-issue"><Button className="back_button" variant="outlined" onClick={this.props.isBack}>Back</Button></div>
            <div className="ut-underline-issue"/>
            <p className="select-input-title-issue">SAP Issue</p>
            <CloseButton onClose={this.props.isClose}/>
          </div>
          <div className="top-middle-issue"> 
            <Table size="small" component={Paper}>
                {this._showTableHead()}
                <TableBody>
                  {this.props.selectedDataSAP
                      && this.props.selectedDataSAP.map((row, id) => (this._showTableBody(row,id)) )
                  }
                </TableBody>
            </Table>
          </div>
          <div className="bottom-row-issue">
              <p className="btn-cancel-issue">* Please check again before pressing the send button</p>
              <Button 
                disabled={this.isDisabled()}
                className={this.isDisabled() ? 'btn-input-issue-disabled' : 'btn-input-issue'} 
                onClick={ async () => {this.props.onKelik(this.state.description); this.props.isTry()} } > Send</Button>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return(
      <div>
        <Modal className="modal-pos-issue" open={this.props.isShowModal} onClose={this.props.isClosed} >
          <div className="body-container">
            {this._renderIssue()}
          </div>
        </Modal>
      </div>
    )
  }
}