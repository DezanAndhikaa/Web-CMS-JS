import React from 'react';
import { Button, Modal, TextField,Table, TableHead, TableRow, TableBody, TableCell, Paper, Tooltip } from '@material-ui/core';
import './SapIssue.scss';
import CloseButton from '../../../../../components/CloseButton/CloseButton';
import moment from 'moment';

export default class SapIssue extends React.Component{

  state={
    isShowModal: false,
    description: []
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
          {this.props.whichTabs ? 
            <TableCell align="left" className="tc-pk-head">SO</TableCell> : 
            <TableCell align="left" className="tc-pk-head">WO</TableCell>
          }
          <TableCell align="left" className="table-cell-issue">CUSTOMER</TableCell>
          <TableCell align="left" className="table-cell-issue">SITE</TableCell>
          <TableCell align="left" className="table-cell-issue">UNIT MODEL</TableCell>
          <TableCell align="left" className="table-cell-issue">COMPONENT DESC</TableCell>
          <TableCell align="left" className="table-cell-issue">PART NUMBER</TableCell>
          <TableCell align="left" className="table-cell-issue">UNIT CODE</TableCell>
          <TableCell align="left" className="table-cell-issue">SERIAL NUMBER</TableCell>
          <TableCell align="left" className="table-cell-issue">LIFETIME COMP</TableCell>
          <TableCell align="left" className="table-cell-issue">PLAN EXECUTION</TableCell>
          <TableCell align="left" className="table-cell-issue">SMR </TableCell>
          <TableCell align="left" className="table-cell-issue">SMR DATE</TableCell>
          <TableCell align="left" className="table-cell-issue">PLAN TYPE</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  _showTableBody(row, id) {
    return (
      <TableBody className= "table-body-issue">
        <TableRow className="table-row-top-issue">
          {this.props.whichTabs ?
            <TableCell align="left" className="tc-pk-body"> {row.SoNumber} </TableCell> : 
            <TableCell align="left" className="tc-pk-body"> {row.WoNumber} </TableCell>
          }
          <TableCell align="left" className="tc-cst"> {row.CustomerName} </TableCell>
          <TableCell align="left" className="tc-short"> {row.SiteCode} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.UnitModel} </TableCell>
          <TableCell align="left" className="tc-long"> {row.ComponentDescription} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.PartNumber} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.UnitCode} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.SerialNumber} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {row.LifeTimeComponent}</TableCell>
          <TableCell align="left" className="table-cell-issue"> {moment(row.PlanExecution).format('DD-MM-YYYY')} </TableCell>
          <TableCell align="left" className="tc-smr"> {row.SMR} </TableCell>
          <TableCell align="left" className="table-cell-issue"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
          <Tooltip arrow title={row.PlanType.charAt(0) === "U" ? "UNSCHEDULE" : ""} >
            <TableCell align="left" className="table-cell-issue"> {row.PlanType.substring(0, 3)} </TableCell>
          </Tooltip>
        </TableRow>
        <TableRow className="table-row-bottom-issue">
          <TableCell colSpan="1"><label>Description<label className="label-required">*</label></label></TableCell>
          <TableCell colSpan="12">{this._showDescription(id)}</TableCell>
        </TableRow>
      </TableBody>
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
              {this.props.selectedDataSAP
                && this.props.selectedDataSAP.map((row, id) => (this._showTableBody(row,id)) )
              }
            </Table>
          </div>
          <div className="bottom-row-issue">
              <p className="btn-cancel-issue">* Please check again before pressing the send button</p>
              <Button className="btn-input-issue" onClick={ async () => {this.props.onKelik(this.state.description);this.props.isTry()} } >Send</Button>
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