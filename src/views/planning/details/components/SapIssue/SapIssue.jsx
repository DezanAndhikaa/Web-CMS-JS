import React from 'react'
import { Button, Modal, TextField, FormHelperText,Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core'
import './SapIssue.scss'

import * as Yup from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import CloseButton from '../../../../../components/CloseButton/CloseButton'
import PlanningListHeader from '../../components/PlanningListHeader/PlanningListHeader'
import moment from 'moment'
import dummy from '../../../../../dummy.json'

const validationSchema = Yup.object().shape({
    limitText: Yup.number()
    .typeError('Harus Angka')
})

export default class SapIssue extends React.Component{

    state={
        isShowModal: false,
    }

    isClicked = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    isClosed = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    _showTableHead() {
        return (
          <TableHead className="table-head-issue" >
          <TableRow className="table-row-issue">
            <PlanningListHeader
              name="SO"
              // isActive={this.props.sortJobsByState.unitModel.isActive}
              delay={300}
              onSearch={this.props.onSearchComp}
              // isAscending={this.props.sortJobsByState.unitModel.isAscending}
            />
            <PlanningListHeader
              name="Customer"
            //   isActive={this.props.sortSalesByState.Customer.isActive}
              delay={300}
            //   isAscending={this.props.sortSalesByState.Customer.isAscending}
            //   onClick={() => this.props.onClickTabHead(SortSalesByCustomer)}
            />
            <PlanningListHeader
              name="Site"
            //   isActive={this.props.sortSalesByState.Site.isActive}
              delay={300}
            //   isAscending={this.props.sortSalesByState.Site.isAscending}
            //   onClick={() => this.props.onClickTabHead(SortSalesBySite)}
            />
            <PlanningListHeader
              name="Unit Model"
            //   isActive={this.props.sortSalesByState.UnitModel.isActive}
              delay={300}
            //   isAscending={this.props.sortSalesByState.UnitModel.isAscending}
            //   onClick={() => this.props.onClickTabHead(SortSalesByUnitModel)}
            />
            <PlanningListHeader
              name="Comp Desc"
            //   isActive={this.props.sortSalesByState.CompDesc.isActive}
              delay={300}
            //   isAscending={this.props.sortSalesByState.CompDesc.isAscending}
            //   onClick={() => this.props.onClickTabHead(SortSalesByCompDesc)}
            />
            <PlanningListHeader
              name="Part Number"
            // //   isActive={this.props.sortJobsByState.backlogOpen.isActive}
              delay={300}
              onSearch={this.props.onSearchComp}
            // //   isAscending={this.props.sortJobsByState.backlogOpen.isAscending}
            />
            <PlanningListHeader
              name="Unit Code"
            // //   isActive={this.props.sortJobsByState.plantExecution.isActive}
              delay={300}
              onSearch={this.props.onSearchComp}
            // //   isAscending={this.props.sortJobsByState.plantExecution.isAscending}
            />
            <PlanningListHeader
              name="Serial Number"
            // //   isActive={this.props.sortJobsByState.status.isActive}
              delay={300}
              onSearch={this.props.onSearchComp}
            // //   isAscending={this.props.sortJobsByState.status.isAscending}            
            />
            <PlanningListHeader
              name="Lifetime"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
              onFilter={this.isFilterLifetime}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
            <PlanningListHeader
              name="Plan"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
              onFilter={this.isFilterDate}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
            <PlanningListHeader
              name="SMR"
              delay={300}
              onSearch={this.props.onSearchComp}
            />
            <PlanningListHeader
              name="SMR Date"
              delay={300}
              onFilter={this.isFilterDate}
            />
          </TableRow>
        </TableHead>
      )
    }

    _showTableBody(row, id) {
        return (
          <TableRow className="table-row-issue">
            <TableCell align="left" className="table-cell-issue"> {row.SoNumber} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.Customer} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.Site} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.UnitModel} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.ComponentDescription} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.PartNumber} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.UnitCode} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.SerialNumber} </TableCell>
            <TableCell align="center" className="table-cell-issue"> {row.LifeTimeComponent}</TableCell>
            <TableCell align="left" className="table-cell-issue"> {moment(row.PlanExecution).format('DD-MM-YYYY')} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {row.SMR} </TableCell>
            <TableCell align="left" className="table-cell-issue"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
          </TableRow>
        )
    }

    _showDescription(){
        return(
            <div className="teks">
                <input type="text" name="name" />
            </div>
        )
    }

    _renderIssue(){
        return(
            <div className="assign-mechanic-modal-issue">
                <div className="container-issue">
                    <div className="top-row-issue">
                        <div className="top-button-issue"><Button>kembali</Button></div>
                        <div className="ut-underline-issue"/>
                        <p className="select-input-title-issue">SAP Issue</p>
                        <CloseButton onClose={this.props.onClosed}/>
                    </div>
                        <div className="top-middle-issue"> 
                        <Table>
                            {this._showTableHead()}
                            <TableBody className="table-body-issue">
                            {this.props.data
                                && this.props.data.map((row, id) => (this._showTableBody(row,id)))
                            }
                                {/* {this._showTableBody()} */}
                            </TableBody>
                        </Table>
                        </div>
                    <div className="bottom-row-issue">
                        <Button className="btn-cancel-issue" onClick={this.props.onClosed}>Cancel</Button>
                        <Button className="btn-input-issue" onClick={ () => {this.props.onStats(this.props.id, this.state.limitText); this.props.onClosed()} } >Input</Button>
                    </div>
                </div>
               
            </div>
        )
    }

    render(){
        return(
            <div >
                <Button onClick={this.isClicked} >Klik ME!</Button>
                    <Modal className="modal-pos-issue" open={this.state.isShowModal} onClose={this.isClosed} >
                        <div>
                            {this._renderIssue()}
                        </div>
                    </Modal>
            </div>
        )
    }

}