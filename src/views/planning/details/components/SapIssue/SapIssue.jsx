import React from 'react'
import { Button, Modal, TextField, FormHelperText,Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@material-ui/core'
import './SapIssue.scss'

import * as Yup from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import CloseButton from '../../../../../components/CloseButton/CloseButton'
import PlanningListHeader from '../../components/PlanningListHeader/PlanningListHeader'
import moment from 'moment'

const validationSchema = Yup.object().shape({
    limitText: Yup.number()
    .typeError('Harus Angka')
})

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

    isSAPIssue = async(data) => {
      await this.props.putSAPIssue({SAPIssue: data }, this.props.token);
      // await ( () => this.props.isClosedSap() )
    }

    onKelik =  async(length, description) => {
      const index = this.props.selectedDataSAP.length
      let arr = []
      for(let i=0; i<index; i++){
        arr = [...arr,{So: this.props.selectedDataSAP[i].SoNumber, Message: description[i]}]
      }
      this.setState({
        SAPIssue: arr
      },
      () => this.isSAPIssue(arr) 
      )
    }

    // isClicked = () => {
    //     this.setState({isShowModal: !this.state.isShowModal})
    // }

    // isClosed = () => {
    //   console.log('uuuuhhuk')
    //     this.setState({isShowModal: !this.state.isShowModal})
    // }

    _showTableHead() {
        return (
          <TableHead className="table-head-issue" >
          <TableRow className="table-row-issue">
            <TableCell>SO</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Site</TableCell>
            <TableCell>Unit Model</TableCell>
            <TableCell>Component &nbsp; Description</TableCell>
            <TableCell>Part &nbsp; Number</TableCell>
            <TableCell>Unit &nbsp; Code</TableCell>
            <TableCell>Serial &nbsp; Number</TableCell>
            <TableCell>Lifetime</TableCell>
            <TableCell>Plan</TableCell>
            <TableCell>SMR</TableCell>
            <TableCell>SMR &nbsp;Date</TableCell>
          </TableRow>
        </TableHead>
      )
    }

    _showTableBody(row, id) {
        return (
          <>
          <TableRow className="table-row-issue">
            <TableCell align="left" className="table-cell-issue"> {row.SoNumber} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.CustomerName} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.SiteCode} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.UnitModel} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.ComponentDescription} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.PartNumber} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.UnitCode} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.SerialNumber} </TableCell>
            <TableCell align="center" className="table-cell-issue"> {row.LifeTimeComponent}</TableCell>
            <TableCell align="left" className="table-cell-issue"> {moment(row.PlanExecution).format('DD-MM-YYYY')} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.SMR} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
            {/* <TableCell align="left" className="table-cell-issue"> 1234 </TableCell>
            <TableCell align="left" className="table-cell-issue"> ULOKLKO </TableCell>
            <TableCell align="left" className="table-cell-issue"> JKT </TableCell>
            <TableCell align="left" className="table-cell-issue"> PCX-01 </TableCell>
            <TableCell align="left" className="table-cell-issue"> BARANG BAGUS </TableCell>
            <TableCell align="left" className="table-cell-issue"> 11111 </TableCell>
            <TableCell align="left" className="table-cell-issue"> 123sad </TableCell>
            <TableCell align="left" className="table-cell-issue"> 1003213 </TableCell>
            <TableCell align="center" className="table-cell-issue"> 1000</TableCell>
            <TableCell align="left" className="table-cell-issue"> 2020-02-12 </TableCell>
            <TableCell align="left" className="table-cell-issue"> 330 </TableCell>
            <TableCell align="left" className="table-cell-issue"> 2019-12-12 </TableCell> */}
          </TableRow>
          <TableRow className="table-row-bottom-issue">
            <TableCell><label>Description &nbsp; :</label></TableCell>
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

    _renderIssue(){
        return(
            <div className="assign-mechanic-modal-issue">
                <div className="container-issue">
                    <div className="top-row-issue">
                        <div className="top-button-issue"><Button className="back_button" variant="outlined" onClick={this.props.isClosed}>Back</Button></div>
                        <div className="ut-underline-issue"/>
                        <p className="select-input-title-issue">SAP Issue</p>
                        <CloseButton onClose={this.props.isClosed}/>
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
                        {/* <Button className="btn-input-issue" onClick={ () => {this.props.onStats(this.props.id, this.state.limitText); this.props.onClosed()} } >Input</Button> */}
                        {/* <Button className="btn-input-issue" onClick={ () => {this.onKelik(this.props.selectedDataSAP.length, this.state.description);this.props.isClosed()} } >Send</Button> */}
                        <Button className="btn-input-issue" onClick={ () => {this.onKelik(this.props.selectedDataSAP.length, this.state.description)} } >Send</Button>
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