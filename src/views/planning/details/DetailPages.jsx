import React from 'react';
import moment, { ISO_8601 } from "moment";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
import { ApiRequestActionsStatus } from "../../../core/RestClientHelpers";
import DropDownList from '../../../components/DropdownList/DropDownList';
import SearchInput from "../../../components/Searchbar/SearchInput";
import BaseButton from '../../../components/Button/BaseButton';
import FilterbyDataAction from '../../../components/FilterByDataAction/FilterbyDataAction';
import NotifButton from '../../../components/ActionButton/NotifButton/NotifButton';
import {Snackbar, Button} from '@material-ui/core';

class DetailPages extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        stats: true,
        isPaging: true,
        isShowPerPage: true,
        showPerPage : 0,
        wasApprove: true,
        isApproved: false,
        snak: true,
        // nextPage: true,
        // prevPage: false,
        // numberOfPage: 2,
        // currentPage: 1,
        // filter: {
        //   filter : {}
        // }
    };
}

componentWillUnmount = () => {
  this.props.updateSalesParameter({
    ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 2, Sort: [], Filter: [],
  });
}

componentDidUpdate = (prevProps) => {
  if (prevProps.salesParameter !== this.props.salesParameter) {
    this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
  }
  if (prevProps.serviceParameter !== this.props.serviceParameter) {
    this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
  }
  if (this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
    prevProps.approveSalesDownloaded.status === ApiRequestActionsStatus.LOADING) {
    this.onClickDownloadSalesApproved()
  }
  if (this.props.approveServiceDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
    prevProps.approveServiceDownloaded.status === ApiRequestActionsStatus.LOADING) {
    this.onClickDownloadServiceApproved()
  }

  // FILTER DROPDOWN
  if(prevProps.filterParameter !== this.props.filterParameter){
    console.log('dumtt,',this.props.filterParameter)
      if(this.props.indexFilterParameter.indexTabParameter === 0){
        this.props.fetchSalesOrder(this.props.filterParameter);
      }else{
        this.props.fetchServiceOrder(this.props.filterParameter);
      }
  }

  //ini untuk trigger sales global search
  if (prevProps.salesSearch !== this.props.salesSearch) {
    this.props.updateSalesParameter({
      ...prevProps.salesParameter.dataFilter, Filter : this.props.salesSearch, PageNumber: 1,
    });
  }
  
  //ini untuk trigger service global search
  if(prevProps.serviceSearch !== this.props.serviceSearch){
    this.props.updateServiceParameter({
      ...prevProps.serviceParameter.dataFilter, Filter : this.props.serviceSearch, PageNumber: 1,
    });
  }
  //search per component
  if(this.state.isPaging){
    if(prevProps.searchComp !== this.props.searchComp){
      this.props.updateSalesParameter({
        ...prevProps.serviceParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
      });
    }
  }else{
    if(prevProps.searchComp !== this.props.searchComp){
      this.props.updateServiceParameter({
        ...prevProps.serviceParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
      });
    }
  }
  
  // SALES ORDER SORTING
  if (prevProps.sortSalesBy !== this.props.sortSalesBy) {
    const { sortSalesBy } = this.props;
    let isDescending = false;
    if (sortSalesBy.Customer.isActive) {
      isDescending = !sortSalesBy.Customer.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Customer',
            Direction : 'desc'
          }],      
      });
    if (sortSalesBy.Customer.isAscending === !sortSalesBy.Customer.isActive) {
      isDescending = !sortSalesBy.Customer.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Customer',
            Direction : 'asc'
          }],      
      });
    }
  }
    if (sortSalesBy.Site.isActive){
      isDescending = !sortSalesBy.Site.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Site',
            Direction : 'desc'
          }],
      });
    if (sortSalesBy.Site.isAscending === !sortSalesBy.Site.isActive) {
      isDescending = !sortSalesBy.Site.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Site',
            Direction : 'asc'
          }],
      });
    }
    } 
    if (sortSalesBy.UnitModel.isActive) {
      isDescending = !sortSalesBy.UnitModel.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'UnitModel',
            Direction : 'desc'
          }],
      });
    if (sortSalesBy.UnitModel.isAscending === !sortSalesBy.UnitModel.isActive) {
      isDescending = !sortSalesBy.UnitModel.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'UnitModel',
            Direction : 'asc'
          }],
      });
    }
    };
    if (sortSalesBy.CompDesc.isActive) {
      isDescending = !sortSalesBy.CompDesc.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'ComponentDescription',
            Direction : 'desc'
          }],
      });
    if (sortSalesBy.CompDesc.isAscending === !sortSalesBy.CompDesc.isActive) {
      isDescending = !sortSalesBy.CompDesc.isAscending;
      this.props.updateSalesParameter({
        ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'ComponentDescription',
            Direction : 'asc'
          }]
      });
    }
    };
  }
  // SERVICE ORDER SORTING
  if (prevProps.sortServiceBy !== this.props.sortServiceBy) {
    const { sortServiceBy } = this.props;
    let isDescending = false;
    if (sortServiceBy.Customer.isActive) {
      isDescending = !sortServiceBy.Customer.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Customer',
            Direction : 'desc'
          }]   
      });
    if (sortServiceBy.Customer.isAscending === !sortServiceBy.Customer.isActive) {
      isDescending = !sortServiceBy.Customer.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Customer',
            Direction : 'asc'
          }]   
      });
    }
  }
    if (sortServiceBy.Site.isActive){
      isDescending = !sortServiceBy.Site.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Site',
            Direction : 'desc'
          }] 
      });
    if (sortServiceBy.Site.isAscending === !sortServiceBy.Site.isActive) {
      isDescending = !sortServiceBy.Site.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'Site',
            Direction : 'asc'
          }] 
      });
    }
    } 
    if (sortServiceBy.UnitModel.isActive) {
      isDescending = !sortServiceBy.UnitModel.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'UnitModel',
            Direction : 'desc'
          }] 
      });
    if (sortServiceBy.UnitModel.isAscending === !sortServiceBy.UnitModel.isActive) {
      isDescending = !sortServiceBy.UnitModel.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'UnitModel',
            Direction : 'asc'
          }] 
      });
    }
    };
    if (sortServiceBy.CompDesc.isActive) {
      isDescending = !sortServiceBy.CompDesc.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'ComponentDescription',
            Direction : 'desc'
          }] 
      });
    if (sortServiceBy.CompDesc.isAscending === !sortServiceBy.CompDesc.isActive) {
      isDescending = !sortServiceBy.CompDesc.isAscending;
      this.props.updateServiceParameter({
        ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          // PageSize: 2,
          Sort: [{
            Field : 'ComponentDescription',
            Direction : 'asc'
          }] 
      });
    }
    };
  }
}

  // PAGINATION DENGAN KONDISI UNTUK TAB SALES ORDER ATAU SERVICE ORDER
  _renderPagination= (pageValue) =>  {
    if (pageValue === 1) {
      this.setState({isPaging : true})
    }if (pageValue === 0) {
      this.setState({isPaging : false})
    }
    if (this.state.isPaging === true) {
      if (this.state.isApproved === false) {
        const web = this.props.displayMode === 'web';
      const nextSales = this.props.salesOrderList.NextPage;
      const prevSales = this.props.salesOrderList.PrevPage;
      const currentPropsSales = this.props.salesOrderList.PageNumber;
      const { TotalPages } = this.props.salesOrderList;
      
      return(
        <div className="pagination">
          <div className="paging">
            {/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
            {web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
            {web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
            {currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
            <div className="page-active">{currentPropsSales}</div>
            {currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
            {web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
            {web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
            {/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
          </div>
        </div>
      )
      }
      if (this.state.isApproved === true) {
        const web = this.props.displayMode === 'web';
      const nextSales = this.props.salesOrderListApproved.NextPage;
      const prevSales = this.props.salesOrderListApproved.PrevPage;
      const currentPropsSales = this.props.salesOrderListApproved.PageNumber;
      const { TotalPages } = this.props.salesOrderListApproved;
      
      return(
        <div className="pagination">
          <div className="paging">
            {/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
            {web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
            {web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
            {currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
            <div className="page-active">{currentPropsSales}</div>
            {currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
            {web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
            {web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
            {/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
          </div>
        </div>
      )
      }
    }
    if (this.state.isPaging === false) {
      const web = this.props.displayMode === 'web';
      const nextSales = this.props.serviceOrderList.NextPage;
      const prevSales = this.props.serviceOrderList.PrevPage;
      const currentPropsService = this.props.serviceOrderList.PageNumber;
      const { TotalPages } = this.props.serviceOrderList;
      
      return(
        <div className="pagination">
          <div className="paging">
            {prevSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
            {web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive">{currentPropsService - 3}</div>}
            {web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive">{currentPropsService - 2}</div>}
            {currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive">{currentPropsService - 1}</div>}
            <div className="page-active">{currentPropsService}</div>
            {/* <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService })} className="page-active">{currentPropsService}</div> */}
            {currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive">{currentPropsService + 1}</div>}
            {web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive">{currentPropsService + 2}</div>}
            {web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive">{currentPropsService + 3}</div>}
            {nextSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
          </div>
        </div>
      )
    }
  }

  //SAAT MENGKLIK SALES ORDER TAB
  onClickServiceOrder = () => {
    this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
  }

  //SAAT MENGKLIK SERVICE ORDER TAB
  onClickSalesOrder = () =>{
    this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
  }

  //KOMPONEN UNTUK SHOW PER/PAGE
  _renderShowPerPage(){
    return(
      <DropDownList 
      {...this.props}
      onPageSize={()=>this.handlePageSize()}
      />
    )
  }

  //KOMPONEN UNTUK GLOBAL SEARCH
  _renderSearchBar(){
    return (
      <div className="bottom-row">
        <SearchInput
        {...this.props}
        // wasApprove={this.state.wasApprove}
        webInfo="Search"
        onSalesSearch={this.props.onSearchSales}
        onServiceSearch={this.props.onSearchService}
      />
      </div>
    );
  }

  _renderNotif(){
    return (
      <NotifButton />
    )
  }

  //FUNGSI UNTUK MENGAPROVE SALES ORDER
  onClickApprovedSales = () => {
    this.props.fetchApprovedSales(this.props.salesParameter.dataFilter);
  }

  //FUNGSI UNTUK MENGAPROVE SERVICE ORDER
  onClickApprovedService = () => {
    this.props.fetchApprovedService(this.props.serviceParameter.dataFilter);
  }

  //FUNGSI UNTUK memanggil Data SALES ORDER yang telah terhapus
  onClickDeletedSales = () => {
    this.props.fetchDeletedSales(this.props.salesParameter.dataFilter);
  }

  //FUNGSI UNTUK memanggil Data SERVICE ORDER yang telah terhapus
  onClickDeletedService = () => {
    this.props.fetchDeletedService(this.props.serviceParameter.dataFilter);
  }

  onClickDownloadSalesApproved = () => {
    let link = document.createElement("a");
    document.body.appendChild(link);
    link.style = "display: none";
    const todayDate = moment(new Date()).format('DD-MM-YYYY');
    // const salesOrder  = this.state.selectedData.So;
    let fileName = "Sales-Order-Planning-"+todayDate+".csv";
    let blob = new Blob([this.props.approveSalesDownloaded.data]),
      url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  onClickDownloadServiceApproved = () => {
    let link = document.createElement("a");
    document.body.appendChild(link);
    link.style = "display: none";
    const todayDate = moment(new Date()).format('DD-MM-YYYY');
    // const serviceOrder  = this.state.selectedServiceData.Wo;
    let fileName = "Service-Order-Planning-"+todayDate+".csv";
    let blob = new Blob([this.props.approveServiceDownloaded.data]),
      url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  handleSalesApprovedDownload = async() => {
    let arr = []
    const index = this.props.selectedSalesPlans.length
    if (this.props.selectedSalesPlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedSalesPlans[i].So]
      }
    }await this.props.downloadSalesApproved(arr);
    if (
      this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.FAILED
    ) {
      this.setState({ showError: true });
    }
  };

  handleServiceApprovedDownload = async() => {
    let arr = []
    const index = this.props.selectedServicePlans.length
    if (this.props.selectedServicePlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedServicePlans[i].Wo]
      }
    }
    await this.props.downloadServiceApproved(arr);
    if (
      this.props.approveServiceDownloaded.status === ApiRequestActionsStatus.FAILED
    ) {
      this.setState({ showError: true });
    }
  };

  handleSalesApprove = async() => {
    let arr = []
    const index = this.props.selectedSalesPlans.length
    if (this.props.selectedSalesPlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedSalesPlans[i].So]
      }
      await this.props.approveSales({So : arr, IsApprove: true})
  }
};

  handleServiceApprove = async() => {
  let arr = []
  const index = this.props.selectedServicePlans.length
    if (this.props.selectedServicePlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedServicePlans[i].Wo]
      }
    await this.props.approveService({Wo : arr, IsApprove: true})
    }
  }

  handleDeleteSales = async() => {
    let arr = []
    const index = this.props.selectedSalesPlans.length
    const todayDate = moment(new Date()).format('YYYY-MM-DD');
    if (this.props.selectedSalesPlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedSalesPlans[i].So]
      }
      await this.props.deleteSales({So : arr, IsDelete: true, UpdatedBy: "admin", UpdatedByName: "admin", UpdatedDate: todayDate})
    }
  }

  handleDeleteService = async() => {
    let arr = []
    const index = this.props.selectedServicePlans.length
    const todayDate = moment(new Date()).format('YYYY-MM-DD');
    if (this.props.selectedServicePlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedServicePlans[i].Wo]
      }
      await this.props.deleteService({Wo : arr, IsDelete: true, UpdatedBy: "admin", UpdatedByName: "admin", UpdatedDate: todayDate})
    }
  }

  handleClickFilterByDataAction = () =>{
    this.setState({
      isApproved : !this.state.isApproved
    })
  }


  //KOMPONEN UNTUK FILTER DATA ACTION
  _renderFilterByDataAction = (value) => {
    if (value === 1) {
      this.setState({wasApprove : true})
    }if (value === 0) {
      this.setState({wasApprove : false})
    }
    if (this.state.wasApprove === true) {
      console.log('skuit pantek', this.props.salesOrderListApproved)
      return(
        <>
          <FilterbyDataAction 
            {...this.props}
            titles="Tracking History"
            onClickPlanningApprove={this.onClickApprovedSales}
            onClickPlanningDelete={this.onClickDeletedSales}
            onClickButton={this.handleClickFilterByDataAction}
          />
          <FilterbyDataAction 
            {... this.props}
            titles="Approve"
          />
        </>
      );
    }
    if (this.state.wasApprove === false) {
      return(
        <>
          <FilterbyDataAction 
            {...this.props}
            titles="Tracking History"
            onClickPlanningApprove={this.onClickApprovedService}
            onClickPlanningDelete={this.onClickDeletedService}
            onClickButton={this.handleClickFilterByDataAction}
          />
          <FilterbyDataAction 
            {... this.props}
            titles="Approve"
          />
        </>
      );
    }
  };

  //KOMPONEN UNTUK BUTTON DOWNLOAD, APPROVE, DAN DELETE
  _renderBaseButton = (value) => {
    if (value === 1) {
      this.setState({wasApprove : true})
    }if (value === 0) {
      this.setState({wasApprove : false})
    }
    if (this.state.wasApprove === true) {
      return(
				<div className="bottom-row">
          <BaseButton titles="Total" totalSelectedItems ={this.props.selectedSalesPlans.length}/>
          <BaseButton titles="Delete" 
            {...this.props}
            disabledButton = {this.props.selectedSalesPlans.length < 1 }
            totalSelectedItems ={this.props.selectedSalesPlans.length}
            whatTabsIsRendered={this.state.isPaging}
            handleDeleteSales={this.handleDeleteSales}
          />
          <BaseButton titles="Download"
            {...this.props}
            whatTabsIsRendered={this.state.isPaging}
            handleSalesApprovedDownload={this.handleSalesApprovedDownload}
            // selectedDownloadData={this.state.selectedData.So} 
          />
          <BaseButton titles="Approve"
            {...this.props}
            whatTabsIsRendered={this.state.isPaging}
            disabledButton = {this.props.selectedSalesPlans.length < 1 }
            totalSelectedItems ={this.props.selectedSalesPlans.length}
            handleSalesApprove={this.handleSalesApprove}
            selectedData={this.state.selectedData}
          />
        </div>
      );
    }
    if (this.state.wasApprove === false) {
      return(
				<div className="bottom-row">
          <BaseButton titles="Total" totalSelectedItems ={this.props.selectedServicePlans.length}/>
          <BaseButton titles="Delete" 
            {...this.props}
            disabledButton = {this.props.selectedServicePlans.length < 1 }
            totalSelectedItems ={this.props.selectedServicePlans.length}
            whatTabsIsRendered={this.state.isPaging}
            handleDeleteService={this.handleDeleteService}
          />
					<BaseButton titles="Download"  
            {...this.props}
            whatTabsIsRendered={this.state.isPaging}
            handleServiceApprovedDownload={this.handleServiceApprovedDownload}
          />
          <BaseButton titles="Approve"
            {...this.props}
            disabledButton = {this.props.selectedServicePlans.length < 1 }
            totalSelectedItems ={this.props.selectedServicePlans.length}
            whatTabsIsRendered={this.state.isPaging}
            selectedServiceData={this.state.selectedServiceData}
            handleServiceApprove={this.handleServiceApprove}
          />
        </div>
      );
    }
  };
    
  isChangeStat = (value,key) =>{
    this.setState({
      lifetime: { Lists :this.state.lifetime.Lists.map(el => (el.SO === key ? {...el, LifeTimeComp : value} : el)) }
    });
  };

  //FUNGSI UNTUK MULTI SELECT SALES ORDER
  updateAssignmentSalesStates = (plan) => {
    if (this.props.selectedSalesPlans
      .some((plans) => plans.So === plan.So,
        // console.log('sssss sales', this.state.selectedData.So)
      )) 
    { return this.props.unselectSalesPlan(plan); }
    return this.props.selectSalesPlan(plan);
  };

  //FUNGSI UNTUK MULTI SELECT SERVICE ORDER
  updateAssignmentServiceStates = (plan) => {
    if (this.props.selectedServicePlans
      .some((plans) => plans.Wo === plan.Wo,
        // console.log('sssss sales', this.state.selectedServiceData.Wo)
      ))
    { return this.props.unselectServicePlan(plan); }
    return this.props.selectServicePlan(plan);
  };

  //KOMPONEN UNTUK RENDER PAGE SALES ORDER DAN SERVICE ORDER
  _renderTabs(){
    return (
      <>
        <PlanningDetailsTab
          {...this.props}
          renderFilterByDataAction={this._renderFilterByDataAction()}
          renderBaseButton={this._renderBaseButton()}
          renderSearch={this._renderSearchBar()}
          renderNotif={this._renderNotif()}
          onClickSalesOrder={this.onClickSalesOrder}        
          onClickServiceOrder={this.onClickServiceOrder}
          // onSearchValue={this.onSearchValue}
          onChoosedService={this.updateAssignmentServiceStates}
          onChoosedSales={this.updateAssignmentSalesStates}
          selectedSalesPlanList={this.props.selectedSalesPlans}
          selectedServicePlanList={this.props.selectedServicePlans}
          displaySalesCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
          displayServiceCheckbox={this.props.serviceParameter.paramsData.assigmentFilter || this.props.serviceParameter.paramsData.inProgressFilter}
          stats={this.state.stats}
          onStats={this.isChangeStat}     
          totalSalesData={this.props.salesOrderList.TotalData}
          totalServiceData={this.props.serviceOrderList.TotalData}
          ApprovedSalesData={this.props.salesOrderListApproved.TotalData}
          onClickTabHead={this.props.onClickSortBy}
          sortSalesByState={this.props.sortSalesBy}
          sortServiceByState={this.props.sortServiceBy}
          onPage={this._renderPagination}
          // wasApprove={this._renderBaseButton}
          isApproved={this.state.isApproved}
        />
      </>
    );
  };

  render(){      
    return(
        <main className="content">
            <div className="table-container">
                  {this._renderTabs()}
              </div>
              <div></div>
              <div className="bottom-row">
                  {this._renderShowPerPage()} {this._renderPagination()}
              </div>
        </main>
    )
  }
}

export default DetailPages;