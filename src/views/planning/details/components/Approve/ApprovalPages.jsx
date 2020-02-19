import React from 'react';
import moment, { ISO_8601 } from "moment";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import './ApprovalPages.scss';
import ApprovalTab from './ApprovalTab/ApprovalTab';
import { ApiRequestActionsStatus } from "../../../../../core/RestClientHelpers";
import DropDownList from '../../../../../components/DropdownList/DropDownList';
import SearchInput from "../../../../../components/Searchbar/SearchInput";
import BaseButton from '../../../../../components/Button/BaseButton';
import FilterbyDataAction from '../../../../../components/FilterByDataAction/FilterbyDataAction';
import NotifButton from '../../../../../components/ActionButton/NotifButton/NotifButton';
import {Snackbar, Button} from '@material-ui/core';

class ApprovalPages extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        stats: true,
        whichTabs: true,
        isShowPerPage: true,
        showPerPage : 0,
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

componentDidMount = () => {
  console.log('tok tok tok : ',this.props.salesOrderList)
}

componentWillUnmount = () => {
  this.props.updateSalesParameter({
    ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 2, Sort: [], Filter: [],
  });
  this.props.updateServiceParameter({
    ...this.props.serviceParameter.dataFilter, PageNumber: 1, PageSize: 2, Sort: [], Filter: [],
  });
}

componentDidUpdate = (prevProps) => {
  if (prevProps.salesParameter !== this.props.salesParameter) {
    // this.props.fetchSalesOrder(this.props.salesParameter.dataFilter, this.props.token);
    this.onClickSalesOrder();
  }
  if (prevProps.serviceParameter !== this.props.serviceParameter) {
    // this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
    this.onClickServiceOrder();
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
        // this.props.fetchSalesOrder(this.props.filterParameter);
        this.props.updateSalesParameter({
          ...prevProps.salesParameter.dataFilter, Filter : this.props.filterParameter.Filter, PageNumber: 1
        })
      }else{
        // this.props.fetchServiceOrder(this.props.filterParameter);
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter : this.props.filterParameter.Filter, PageNumber: 1
        })
      }
  }

  //FILTER RANGE LIFETIME
  if(prevProps.filterLifetime !== this.props.filterLifetime){
    console.log('dumtt,',this.props.filterLifetime)
    this.props.updateSalesParameter({
      ...prevProps.serviceParameter.dataFilter, Filter : this.props.filterLifetime.Filter, PageNumber: 1
    })
    // this.props.fetchSalesOrder(this.props.filterLifetime);
  }

    //FILTER RANGE DATE
    if(prevProps.filterDate !== this.props.filterDate){
      this.props.fetchSalesOrder(this.props.filterDate);
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
  if(this.state.whichTabs){
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
            Field : 'CustomerName',
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
            Field : 'CustomerName',
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
            Field : 'SiteCode',
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
            Field : 'SiteCode',
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
            Field : 'CustomerName',
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
            Field : 'CustomerName',
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
            Field : 'SiteCode',
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
            Field : 'SiteCode',
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
      this.setState({whichTabs : true})
    }if (pageValue === 0) {
      this.setState({whichTabs : false})
    }
    if (this.state.whichTabs === true) {
      const web = this.props.displayMode === 'web';
      const nextSales = this.props.salesOrderList.NextPage;
      const prevSales = this.props.salesOrderList.PrevPage;
      const currentPropsSales = this.props.salesOrderList.PageNumber;
      const { TotalPages } = this.props.salesOrderList;
      
      return(
        <div className="paginations">
          <div className="paging-approval">
            {/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
            {web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive-approval">{currentPropsSales - 3}</div>}
            {web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive-approval">{currentPropsSales - 2}</div>}
            {currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive-approval">{currentPropsSales - 1}</div>}
            <div className="page-active-approval">{currentPropsSales}</div>
            {currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive-approval">{currentPropsSales + 1}</div>}
            {web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive-approval">{currentPropsSales + 2}</div>}
            {web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive-approval">{currentPropsSales + 3}</div>}
            {/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
          </div>
        </div>
      )
      }
    if (this.state.whichTabs === false) {
      const web = this.props.displayMode === 'web';
      const nextSales = this.props.serviceOrderList.NextPage;
      const prevSales = this.props.serviceOrderList.PrevPage;
      const currentPropsService = this.props.serviceOrderList.PageNumber;
      const { TotalPages } = this.props.serviceOrderList;
      
      return(
        <div className="paginations">
          <div className="paging-approval">
            {prevSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page-approval"><KeyboardArrowLeft className="arrow-icon-approval" /></div>}
            {web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive-approval">{currentPropsService - 3}</div>}
            {web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive-approval">{currentPropsService - 2}</div>}
            {currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive-approval">{currentPropsService - 1}</div>}
            <div className="page-active-approval">{currentPropsService}</div>
            {/* <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService })} className="page-active">{currentPropsService}</div> */}
            {currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive-approval">{currentPropsService + 1}</div>}
            {web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive-approval">{currentPropsService + 2}</div>}
            {web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive-approval">{currentPropsService + 3}</div>}
            {nextSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page-approval"><KeyboardArrowRight className="arrow-icon-approval" /></div>}
          </div>
        </div>
      )
    }
  }

  //SAAT MENGKLIK SERVICE ORDER TAB
  onClickServiceOrder = async() => {
   await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter, this.props.token);
  }

  //SAAT MENGKLIK SALES ORDER TAB
  onClickSalesOrder = async() =>{
    await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter, this.props.token);
  }  

  //KOMPONEN UNTUK SHOW PER/PAGE
  _renderShowPerPage(){
    return(
      <DropDownList 
        {...this.props}
        handleClickShowPerPage={this.handleClickShowPerPage}
      />
    )
  }

  handleClickShowPerPage = (value) =>{
    if (this.state.whichTabs === true) {
          this.props.clearSelectedSalesPlans();
					this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: value})
    }else{
      this.props.clearSelectedServicePlans();
					this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value})
    }
  }

  //KOMPONEN UNTUK GLOBAL SEARCH
  _renderSearchBar(){
    return (
      <div className="bottom-row-approval">
        <SearchInput
        {...this.props}
        webInfo="Search"
        handleSearch={this.handleSearch}
      />
      </div>
    );
  }

  handleSearch=(value)=>{
		this.setState({ searchVal : value})
		if (this.state.whichTabs === true) {
			setTimeout(() => {
				this.props.onSearchSales(this.state.searchVal)
			}, 1000);
		}if (this.state.whichTabs === false) {
			setTimeout(() => {
				this.props.onSearchService(this.state.searchVal)
			}, 1000);
		}
	}

  _renderNotif(){
    return (
      <>
        <FilterbyDataAction 
          {...this.props}
          titles="Input Lifetime"
        />
        <NotifButton 
        {...this.props}
        />
      </>
    )
  }

  //FUNGSI UNTUK MENGAPROVE SALES ORDER
  onClickApprovedSales = () => {
    this.props.fetchApprovedSales(this.props.salesParameter.dataFilter,this.props.token);
  }
  //FUNGSI UNTUK MENGAPROVE SERVICE ORDER
  onClickApprovedService = () => {
    this.props.fetchApprovedService(this.props.serviceParameter.dataFilter, this.props.token);
  }
  //FUNGSI UNTUK memanggil Data SALES ORDER yang telah terhapus
  onClickDeletedSales = () => {
    this.props.fetchDeletedSales(this.props.salesParameter.dataFilter, this.props.token);
  }
  //FUNGSI UNTUK memanggil Data SERVICE ORDER yang telah terhapus
  onClickDeletedService = () => {
    this.props.fetchDeletedService(this.props.serviceParameter.dataFilter, this.props.token);
  }
  onClickDownloadSalesApproved = () => {
    let link = document.createElement("a");
    document.body.appendChild(link);
    link.style = "display: none";
    const todayDate = moment(new Date()).format('DD-MM-YYYY');
    // const salesOrder  = this.state.selectedData.SoNumber;
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
    // const serviceOrder  = this.state.selectedServiceData.WoNumber;
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
        arr = [...arr, this.props.selectedSalesPlans[i].SoNumber]
      }
    }await this.props.downloadSalesApproved(arr, this.props.token);
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
        arr = [...arr, this.props.selectedServicePlans[i].WoNumber]
      }
    }
    await this.props.downloadServiceApproved(arr, this.props.token);
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
        arr = [...arr, this.props.selectedSalesPlans[i].SoNumber]
      }
      await this.props.approveSales({SoNumber : arr, IsApprove: true}, this.props.token)
      this.onClickSalesOrder();
      await this.props.clearSelectedSalesPlans();
  }
};

  handleServiceApprove = async() => {
  let arr = []
  const index = this.props.selectedServicePlans.length
    if (this.props.selectedServicePlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedServicePlans[i].WoNumber]
      }
    await this.props.approveService({WoNumber: arr, IsApprove: true}, this.props.token)
    this.onClickServiceOrder();
    await this.props.clearSelectedServicePlans();
    }
  }

  handleSendtoEdit = async() => {
    let arr = []
    const index = this.props.selectedSalesPlans.length
    if (this.props.selectedSalesPlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedSalesPlans[i].So]
      }
      await this.props.unapproveSales({So : arr, IsRevised: true}, this.props.token)
      this.onClickSalesOrder();
      await this.props.clearSelectedSalesPlans();
    }
  }

  handleDeleteSales = async() => {
    let arr = []
    const index = this.props.selectedSalesPlans.length
    const todayDate = moment(new Date()).format('YYYY-MM-DD');
    if (this.props.selectedSalesPlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedSalesPlans[i].SoNumber]
      }
      await this.props.deleteSales({SoNumber : arr, IsDelete: true, UpdatedBy: "admin", UpdatedByName: "admin", UpdatedDate: todayDate}, this.props.token)
      this.onClickSalesOrder();
      await this.props.clearSelectedSalesPlans();
    }
  }

  handleDeleteService = async() => {
    let arr = []
    const index = this.props.selectedServicePlans.length
    const todayDate = moment(new Date()).format('YYYY-MM-DD');
    if (this.props.selectedServicePlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedServicePlans[i].WoNumber]
      }
      await this.props.deleteService({WoNumber : arr, IsDelete: true, UpdatedBy: "admin", UpdatedByName: "admin", UpdatedDate: todayDate}, this.props.token)
      this.onClickServiceOrder();
      await this.props.clearSelectedServicePlans();
    }
  }

  handleClickFilterByDataAction = () =>{
    this.setState({
      isApproved : !this.state.isApproved
    })
  }

  //KOMPONEN UNTUK FILTER DATA ACTION
  _renderFilterByDataAction = (value) => {
    if (this.state.whichTabs === true) {
      return(
        <>
          <FilterbyDataAction 
            {...this.props}
            titles="Status"
          />
          <FilterbyDataAction 
            {...this.props}
            titles="Tracking History"
          />
        </>
      );
    }
    if (this.state.whichTabs === false) {
      return(
        <>
          <FilterbyDataAction 
            {...this.props}
            titles="Status"
          />
          <FilterbyDataAction 
            {...this.props}
            titles="Tracking History"
          />
        </>
      );
    }
  };

  isChangeStat = (value,key) =>{
    this.setState({
      lifetime: { Lists :this.state.lifetime.Lists.map(el => (el.SoNumber === key ? {...el, LifeTimeComp : value} : el)) }
    });
  };

  //KOMPONEN UNTUK BUTTON DOWNLOAD, APPROVE, DAN DELETE
  _renderBaseButton = (value) => {
    if (this.state.whichTabs === true) {
      console.log('TAB SALES')
      return(
        <div className="header-rows">
          {/* <BaseButton titles="Total" totalSelectedItems ={this.props.selectedSalesPlans.length}/> */}
          <BaseButton titles="Approve"
            {...this.props}
            whatTabsIsRendered={this.state.whichTabs}
            disabledButton = {this.props.selectedSalesPlans.length < 1 }
            totalSelectedItems ={this.props.selectedSalesPlans.length}
            handleSalesApprove={this.handleSalesApprove}
            selectedData={this.state.selectedData}
          />
          <BaseButton titles="Cancel Approve"
            {...this.props}
            selectedDataSAP={this.props.selectedSalesPlans}
            whatTabsIsRendered={this.state.whichTabs}
            disabledButton = {this.props.selectedSalesPlans.length < 1 }
            totalSelectedItems ={this.props.selectedSalesPlans.length}
            handleSendtoEdit={this.handleSendtoEdit}
            selectedData={this.state.selectedData}
          />
          <BaseButton titles="Edit" />
          <BaseButton titles="Delete" 
            {...this.props}
            disabledButton = {this.props.selectedSalesPlans.length < 1 }
            totalSelectedItems ={this.props.selectedSalesPlans.length}
            whatTabsIsRendered={this.state.whichTabs}
            handleDeleteSales={this.handleDeleteSales}
          />
        </div>
      );
    }
    if (this.state.whichTabs === false) {
      console.log('TAB service')
      return(
				<div className="header-rows">
          {/* <BaseButton titles="Total" totalSelectedItems ={this.props.selectedServicePlans.length}/> */}
          <BaseButton titles="Approve"
            {...this.props}
            disabledButton = {this.props.selectedServicePlans.length < 1 }
            totalSelectedItems ={this.props.selectedServicePlans.length}
            whatTabsIsRendered={this.state.whichTabs}
            selectedServiceData={this.state.selectedServiceData}
            handleServiceApprove={this.handleServiceApprove}
          />
          <BaseButton titles="Cancel Approve"/>
          <BaseButton titles="Edit" />
          <BaseButton titles="Delete" 
            {...this.props}
            disabledButton = {this.props.selectedServicePlans.length < 1 }
            totalSelectedItems ={this.props.selectedServicePlans.length}
            whatTabsIsRendered={this.state.whichTabs}
            handleDeleteService={this.handleDeleteService}
          />
        </div>
      );
    }
  };

  //FUNGSI UNTUK MULTI SELECT SALES ORDER
  updateAssignmentSalesStates = (plan) => {
    if (this.props.selectedSalesPlans
      .some((plans) => plans.SoNumber === plan.SoNumber,
      )) 
    { return this.props.unselectSalesPlan(plan); }
    return this.props.selectSalesPlan(plan);
  };

  //FUNGSI UNTUK MULTI SELECT SERVICE ORDER
  updateAssignmentServiceStates = (plan) => {
    if (this.props.selectedServicePlans
      .some((plans) => plans.WoNumber === plan.WoNumber,
      ))
    { return this.props.unselectServicePlan(plan); }
    return this.props.selectServicePlan(plan);
  };

  //KOMPONEN UNTUK RENDER PAGE SALES ORDER DAN SERVICE ORDER
  _renderTabs(){
    return (
      <>
        <ApprovalTab
          {...this.props}
          renderFilterByDataAction={this._renderFilterByDataAction()}  
          renderBaseButton={this._renderBaseButton()}
          renderSearch={this._renderSearchBar()}
          renderNotif={this._renderNotif()}
          onClickSalesOrder={this.onClickSalesOrder}        
          onClickServiceOrder={this.onClickServiceOrder}
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
          // baseButton={this._renderBaseButton}
          isApproved={this.state.isApproved}
          token={this.props.token}
        />
      </>
    );
  };

  render(){     
    console.log('history', this.props.token)
    return(
      <main className="content">
          <div className="table-container-approval">
                {this._renderTabs()}
            </div>
            <div></div>
            <div className="bottom-row-approval">
                {this._renderShowPerPage()} {this._renderPagination()}
            </div>
      </main>
    )
  }
}

export default ApprovalPages;