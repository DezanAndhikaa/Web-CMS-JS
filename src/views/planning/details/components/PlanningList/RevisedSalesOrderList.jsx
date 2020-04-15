import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Snackbar
} from '@material-ui/core';
import './PlanningList.scss';import { Spinner } from '../../../../../assets/icons'
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import moment from 'moment';
import EditButton from '../../../../../components/ActionButton/EditButton/EditButton';
import ConfirmationModal from '../../../../../components/ConfirmationModal/ConfirmationModal';

export default class RevisedSalesOrderList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isShowModal: false,
      checkedValue: false,
      stats: false,
      openModalrevised: false,
      putLifetime: {
        SoNumber : '',
        LifeTimeComponent : '',
      }
    }
  }

  componentDidMount = async () => {
    await this.props.onClickRevisedSales();
  }

  componentWillMount = () =>{
    this.props.updateSalesRevParameter({
      ...this.props.salesRevisedParam.dataFilter, PageNumber: 1, PageSize: 5, Sort: [], Filter: [],
    });
  }

  putLifetimke = async(data) => {
    await this.props.putLifetimeComp(data, this.props.token);
    this.setState({
      openModalrevised : !this.state.openModalrevised
    })
    await this.props.onClickRevisedSales();
  }
  
  isPutLifetime =  async(key, value) => {
      this.setState({
        putLifetime: {
          SoNumber : key,
          LifeTimeComponent: value
        },
        stats: true
      }, 
      () => this.putLifetimke(this.state.putLifetime) 
      )
  }

  showTableHead() {
      return (
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
          <TableRow classes={{ root: 'table-row' }}>
            <TableCell align="left" className="table-cell">SO</TableCell>
            <TableCell align="left" className="table-cell">Customer</TableCell>
            <TableCell align="left" className="table-cell">Site</TableCell>
            <TableCell align="left" className="table-cell">Unit Model</TableCell>
            <TableCell align="left" className="table-cell">Component Description</TableCell>
            <TableCell align="left" className="table-cell">Part Number</TableCell>
            <TableCell align="left" className="table-cell">Unit Code</TableCell>
            <TableCell align="left" className="table-cell">Serial Number</TableCell>
            <TableCell align="left" className="table-cell">Lifetime Component</TableCell>
            <TableCell align="left" className="table-cell">Plan Execution</TableCell>
            <TableCell align="left" className="table-cell">SMR</TableCell>
            <TableCell align="left" className="table-cell">SMR Date</TableCell>
          </TableRow>
      </TableHead>
    )
  }

  showTableBody(row,id) {
    return (
      <TableRow key={id} classes={{ root: 'table-row' }}>
        <TableCell align="left" className="table-cell"> {row.SoNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.CustomerName} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SiteCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
        <TableCell align="left" className="table-cell"> {row.ComponentDescription} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
        <TableCell align="left" className="table-cell"> 
        {this.props.salesOrderRevised.Lists[id].LifeTimeComponent !== "-" ? 
        <EditButton 
          {...this.props}
          idEdit="Rev" 
          title="Input Lifetime Component" 
          RowData={row.LifeTimeComponent}
          lifetime={row.LifeTimeComponent}
          onStats={this.isPutLifetime} 
          values={this.props.salesOrderRevised.Lists[id].LifeTimeComponent} 
          field="edit" 
          id={row.SoNumber} /> : ""}
        </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.PlanExecutionDate).format('DD-MM-YYYY')} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SMR} </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
      </TableRow>
    )
  }

  handleClick = () =>{
    this.setState({
      snak: true
    })
  }

  handleClose = () => {
    this.setState({
      stats: false
    })
  }

  closeSuccessEdit = () => {
    this.setState({
      openModalrevised: !this.state.openModalrevised
    })
  }
  
  renderModalRevised(){
    return(
      <ConfirmationModal 
        {...this.props}
        idModal="Revised"
        openModal={this.state.openModalrevised}
        onClose={this.closeSuccessEdit}
      />
    )
  }

  showLoading(){
    if(this.props.fetchStatusRevised === ApiRequestActionsStatus.LOADING){
      return(
        <div className="loading-container">
          <img 
            src={Spinner}
            alt="loading-spinner"
            className="loading-icon"
            />
        </div>
      )
    }
    else if(this.props.fetchStatusPutLifetime === ApiRequestActionsStatus.SUCCEEDED){
      return(
        this.renderModalRevised()
      )
    }
    else if(this.props.fetchStatusPutLifetime === ApiRequestActionsStatus.LOADING){
      return(
            <div>
            <Snackbar
              anchorOrigin={{ vertical: 'center',horizontal: 'center'}}
              bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
              open={this.state.stats}
              onClose={this.handleClose}
              autoHideDuration={3000}
              message="Please Wait. Page will reload automatically"
            />
          </div>
          )
    }
    else if(this.props.fetchStatusRevised === ApiRequestActionsStatus.FAILED){
      return(
        <div className="loading-container">
          OOPS THERE WAS AN ERROR :'(
        </div>
      )
    }else if(this.props.salesOrderRevised.Lists.length === 0){
      return(
        <div className="loading-container">
          DATA NOT FOUND
        </div>
      )
    }
  }

render(){
        return(
          <div> 
            <Table classes={{ root: 'table' }} className="table-rev">
            {this.showTableHead()}
            <TableBody classes={{ root: 'table-body' }}>
              {this.props.salesOrderRevised.Lists
                && this.props.salesOrderRevised.Lists.map((row, id) => (
                  this.showTableBody(row,id)
                ))}
              </TableBody>
            </Table>
            {this.showLoading()}
          </div>
        )
      }
  }