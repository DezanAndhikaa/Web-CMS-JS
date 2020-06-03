import React from 'react';
import{ 
  Button, 
  TextField, 
  Table, 
  TableHead, 
  TableRow, 
  TableBody, 
  TableCell, 
  FormLabel, 
  ButtonGroup} 
from '@material-ui/core';
import './SapIssuePages.scss';
import moment from 'moment';
import { Menu } from '../../../../../constants';

class SapIssuePages extends React.PureComponent {
  state={
    whichTabs: true,
    description: [],
    tag: [],
    isClicked: false,
    selectedBtn: ''
  }

  onClickBtn(id){
    this.setState({
      isClicked: !this.state.isClicked
    })
    if(id === "so"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'SO']
        }));
      }else{
        this.state.tag.delete("SO");
      }
    }
    else if(id === "wo"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'WO']
        }));
      }else{
        this.state.tag.delete("WO");
      }
    }
    else if(id === "cust"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'Customer']
        }));
      }else{
        this.state.tag.delete("Customer");
      }
    }
    else if(id === "site"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'Site']
        }));
      }else{
        this.state.tag.delete("Site");
      }
    }
    else if(id === "unitModel"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'UnitModel']
        }));
      }else{
        this.state.tag.delete("UnitModel");
      }
    }
    else if(id === "compDesc"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'ComponentDescription']
        }));
      }else{
        this.state.tag.delete("ComponentDescription");
      }
    }
    else if(id === "partNumber"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'PartNumber']
        }));
      }else{
        this.state.tag.delete("PartNumber");
      }
    }
    else if(id === "unitCode"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'UnitCode']
        }));
      }else{
        this.state.tag.delete("UnitCode");
      }
    }
    else if(id === "sn"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'SerialNumber']
        }));
      }else{
        this.state.tag.delete("SerialNumber");
      }
    }
    else if(id === "planExec"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'PlanExecution']
        }));
      }else{
        this.state.tag.delete("PlanExecution");
      }
    }
    else if(id === "smr"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'SMR']
        }));
      }else{
        this.state.tag.delete("SMR");
      }
    }
    else if(id === "smrDate"){
      if(this.state.isClicked === true){
        this.setState(previousState => ({
          isClicked: true,
          tag: [...previousState.tag, 'SMRDate']
        }));
      }else{
        this.state.tag.delete("SMRDate");
      }
    }
  }

  handleChange(id, e) {
    this.setState({
      description: { ...this.state.description, [id]: e.target.value },
      tag: { ...this.state.tag, [id]: e.target.value}
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

  _showPaddingHeader(){
    return(
      <>
        <TableRow className="tr-spasi"></TableRow>
      </>
    )
  }

  _showTableBody(row) {
    return (
      <>
        {this._showPaddingHeader()}
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
          <ButtonGroup 
            value={this.state.tag[id]} 
            name={this.state.tag[id]} 
            onChange={this.handleChange.bind(this, id)} 
          >
            {this.state.whichTabs ?
              <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="so" onClick={this.onClickBtn()}>SO</Button> :
              <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="wo" onClick={this.onClickBtn()}>WO</Button>}
            <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="cust" onClick={this.onClickBtn()}>Customer</Button>
            <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="site" onClick={this.onClickBtn()}>Site</Button>
            <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="unitModel" onClick={this.onClickBtn()}>Unit Model</Button>
            <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="compDesc" onClick={this.onClickBtn()}>Component Description</Button>
            <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="partNumber" onClick={this.onClickBtn()}>Part Number</Button>
            <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="unitCode" onClick={this.onClickBtn()}>Unit Code</Button>
            <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="sn" onClick={this.onClickBtn()}>Serial Number</Button>
            <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="planExec" onClick={this.onClickBtn()}>Plan Execution</Button>
            {this.state.whichTabs ?
              <>
                <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="smr" onClick={this.onClickBtn()}>SMR</Button>
                <Button className={this.state.isClicked === false ? "btn-reason" : "btn-reason-clicked"} id="smrDate" onClick={this.onClickBtn()}>SMR Date</Button> 
              </> : ""
            }
          </ButtonGroup>
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

  isSAPIssue = async(data) => {
    await this.props.putSAPIssue({SAPIssues: data }, this.props.token, this.props.whichTabs);
  }

  _sendSap =  async( description, tag) => {
    const index = this.props.selectedDataSAP.length
    let arr = []
    if(this.props.whichTabs){
      for(let i=0; i<index; i++){
        arr = [...arr,{NumberOrder: this.props.selectedDataSAP[i].SoNumber, Message: description[i], Tag: tag[i]}]
      }
    }else{
      for(let i=0; i<index; i++){
        arr = [...arr,{NumberOrder: this.props.selectedDataSAP[i].WoNumber, Message: description[i], Tag: tag[i]}]
      }
    }
    this.setState({
      SAPIssue: arr
    },
    () => this.isSAPIssue(arr) 
    )
  }

  _renderPagination = (pageValue) => {
    if (pageValue === 1) {
      this.setState({ whichTabs: true })
    } if (pageValue === 0) {
      this.setState({ whichTabs: false })
    }
    if (this.state.whichTabs === true) {
      const web = this.props.displayMode === 'web';
      // const nextSales = this.props.salesOrderList.NextPage;
      // const prevSales = this.props.salesOrderList.PrevPage;
      const currentPropsSales = this.props.salesOrderListSap.PageNumber;
      const { TotalPages } = this.props.salesOrderListSap;
      return (
        <div className="pagination-sap">
          <div className="paging-sap">
							{/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
							{web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive-sap">{currentPropsSales - 3}</div>}
							{web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive-sap">{currentPropsSales - 2}</div>}
							{currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive-sap">{currentPropsSales - 1}</div>}
							<div className="page-active-sap">{currentPropsSales}</div>
							{currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive-sap">{currentPropsSales + 1}</div>}
							{web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive-sap">{currentPropsSales + 2}</div>}
							{web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive-sap">{currentPropsSales + 3}</div>}
							{/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
						</div>
        </div>
      )
    }
    if (this.state.whichTabs === false) {
      const web = this.props.displayMode === 'web';
      // const nextSales = this.props.serviceOrderList.NextPage;
      // const prevSales = this.props.serviceOrderList.PrevPage;
      const currentPropsService = this.props.serviceOrderListSap.PageNumber;
      const { TotalPages } = this.props.serviceOrderListSap;

      return (
        <div className="pagination-sap">
          <div className="paging-sap">
							{web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive-sap">{currentPropsService - 3}</div>}
							{web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive-sap">{currentPropsService - 2}</div>}
							{currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive-sap">{currentPropsService - 1}</div>}
							<div className="page-active-sap">{currentPropsService}</div>
							{currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive-sap">{currentPropsService + 1}</div>}
							{web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive-sap">{currentPropsService + 2}</div>}
							{web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive-sap">{currentPropsService + 3}</div>}
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
        <div className="bottom-row-sap">
          {this._renderPagination()}
        </div>
      </main>
    );
  }
}

export default SapIssuePages;