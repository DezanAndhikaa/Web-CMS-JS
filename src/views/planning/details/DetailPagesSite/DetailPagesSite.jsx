import React from 'react';
import './DetailPagesSite.scss';
import DetailsTab from './Tab/DetailsTab';
import DropDownList from '../../../../components/DropdownList/DropDownList';
import SearchInput from "../../../../components/Searchbar/SearchInput";
import FilterbyDataAction from '../../../../components/FilterByDataAction/FilterbyDataAction';
import NotifButton from '../../../../components/ActionButton/NotifButton/NotifButton';
import {ApiRequestActionsStatus} from '../../../../core/RestClientHelpers';
import roleService from '../../../../utils/roleService.helper';

const RoleUser = new roleService();
class DetailPagesSite extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        stats: true,
        whichTabs: true,
        isShowPerPage: true,
        showPerPage : 0,
        isShowApproveSucceed: false,
        snak: true,
        openSuccess : false,
    };
}

componentWillUnmount = () => {
  this.props.updateSalesParameter({
    ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
  });
  this.props.updateServiceParameter({
    ...this.props.serviceParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
  });
  this.props.updateSalesRevParameter({
    ...this.props.salesRevisedParam.dataFilter, PageNumber: 1, PageSize: 5, Sort: [], Filter: [],
  });
}

componentDidUpdate = (prevProps) => {
  if (prevProps.salesParameter !== this.props.salesParameter) {
    this.onClickSalesOrder();
  }
  if (prevProps.serviceParameter !== this.props.serviceParameter) {
    this.onClickServiceOrder();
  }
  if (prevProps.salesRevisedParam !== this.props.salesRevisedParam) {
    this.onClickRevisedSales();
  }
  if(prevProps.searchSalesParameter !== this.props.searchSalesParameter){
    this.fetchSearchSales();
  }
  if(prevProps.searchServiceParameter !== this.props.searchServiceParameter){
    this.fetchSearchService();
  }
  // FILTER DROPDOWN
  if(prevProps.filterParameter !== this.props.filterParameter){
    if (Number(RoleUser.role()) === 2 || Number(RoleUser.role()) === 4 || Number(RoleUser.role()) === 9){
      console.log('tab apa: ', this.props.indexFilterParameter.indexTabParameter)
      if(this.props.indexFilterParameter.indexTabParameter === 0){
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter : this.props.filterParameter.Filter, PageNumber: 1
        })
      }
    }else{
      if(this.props.indexFilterParameter.indexTabParameter === 0){
        this.props.updateSalesParameter({
          ...prevProps.salesParameter.dataFilter, Filter : this.props.filterParameter.Filter, PageNumber: 1
        })
      }else{
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter : this.props.filterParameter.Filter, PageNumber: 1
        })
      }
    }
  }

  //FILTER RANGE LIFETIME
  if(prevProps.filterLifetime !== this.props.filterLifetime){
    this.props.updateServiceParameter({
      ...prevProps.serviceParameter.dataFilter, Filter : this.props.filterLifetime.Filter, PageNumber: 1
    })
  }

  //FILTER RANGE DATE
  if(this.state.whichTabs){
    if(prevProps.filterDate !== this.props.filterDate){
      this.props.fetchSalesOrder(this.props.filterDate,this.props.token);
    }
  }else{
    if(prevProps.filterDate !== this.props.filterDate){
      this.props.fetchServiceOrder(this.props.filterDate,this.props.token);
    }
  }

  //ini untuk trigger sales global search
  if (prevProps.salesSearch !== this.props.salesSearch) {
    this.props.updateSearchSales({
      ...prevProps.searchSalesParameter, Category: 'Lifetime', Keyword: this.props.salesSearch,
    });
  }
  
  //ini untuk trigger service global search
  if(prevProps.serviceSearch !== this.props.serviceSearch){
    this.props.updateSearchService({
      ...prevProps.searchServiceParameter, Category: 'Approval', Keyword: this.props.serviceSearch,
    });
  }

  //search per component
  if (Number(RoleUser.role()) === 2 || Number(RoleUser.role()) === 4 || Number(RoleUser.role()) === 9){
    if(this.state.whichTabs && prevProps.searchComp !== this.props.searchComp){
      this.props.updateServiceParameter({
        ...prevProps.serviceParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
      });
    }
  }else{
    if(this.state.whichTabs){
      if(prevProps.searchComp !== this.props.searchComp){
        if(this.props.searchComp[0].Value === ""){
          this.props.updateSalesParameter({
            ...prevProps.salesParameter.dataFilter, Filter: this.props.searchComp.Value = "",
          });  
        }else{
          this.props.updateSalesParameter({
            ...prevProps.salesParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
          });
        }
      }
    }else{
      if(prevProps.searchComp !== this.props.searchComp){
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
        });
      }
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
    if (Number(RoleUser.role()) === 2 || Number(RoleUser.role()) === 4 || Number(RoleUser.role()) === 9){
      if (this.state.whichTabs === true) {
        const web = this.props.displayMode === 'web';
        // const nextSales = this.props.serviceOrderList.NextPage;
        // const prevSales = this.props.serviceOrderList.PrevPage;
        const currentPropsService = this.props.serviceOrderList.PageNumber;
        const { TotalPages } = this.props.serviceOrderList;
        return(
          <div className="paginations">
            <div className="paging-revision">
              {/* {prevSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page-revision"><KeyboardArrowLeft className="arrow-icon-revision" /></div>} */}
              {web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive-revision">{currentPropsService - 3}</div>}
              {web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive-revision">{currentPropsService - 2}</div>}
              {currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive-revision">{currentPropsService - 1}</div>}
              <div className="page-active-revision">{currentPropsService}</div>
              {/* <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService })} className="page-active">{currentPropsService}</div> */}
              {currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive-revision">{currentPropsService + 1}</div>}
              {web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive-revision">{currentPropsService + 2}</div>}
              {web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive-revision">{currentPropsService + 3}</div>}
              {/* {nextSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page-revision"><KeyboardArrowRight className="arrow-icon-revision" /></div>} */}
            </div>
          </div>
        )
      }
    }else{
      if (this.state.whichTabs === true) {
        const web = this.props.displayMode === 'web';
        // const nextSales = this.props.salesOrderList.NextPage;
        // const prevSales = this.props.salesOrderList.PrevPage;
        const currentPropsSales = this.props.salesOrderList.PageNumber;
        const { TotalPages } = this.props.salesOrderList;
        
        return(
          <div className="paginations">
            <div className="paging-revision">
              {/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
              {web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive-revision">{currentPropsSales - 3}</div>}
              {web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive-revision">{currentPropsSales - 2}</div>}
              {currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive-revision">{currentPropsSales - 1}</div>}
              <div className="page-active-revision">{currentPropsSales}</div>
              {currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive-revision">{currentPropsSales + 1}</div>}
              {web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive-revision">{currentPropsSales + 2}</div>}
              {web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive-revision">{currentPropsSales + 3}</div>}
              {/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
            </div>
          </div>
        )
      }else{
        const web = this.props.displayMode === 'web';
        // const nextSales = this.props.serviceOrderList.NextPage;
        // const prevSales = this.props.serviceOrderList.PrevPage;
        const currentPropsService = this.props.serviceOrderList.PageNumber;
        const { TotalPages } = this.props.serviceOrderList;
        return(
          <div className="paginations">
            <div className="paging-revision">
              {/* {prevSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page-revision"><KeyboardArrowLeft className="arrow-icon-revision" /></div>} */}
              {web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive-revision">{currentPropsService - 3}</div>}
              {web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive-revision">{currentPropsService - 2}</div>}
              {currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive-revision">{currentPropsService - 1}</div>}
              <div className="page-active-revision">{currentPropsService}</div>
              {/* <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService })} className="page-active">{currentPropsService}</div> */}
              {currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive-revision">{currentPropsService + 1}</div>}
              {web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive-revision">{currentPropsService + 2}</div>}
              {web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive-revision">{currentPropsService + 3}</div>}
              {/* {nextSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page-revision"><KeyboardArrowRight className="arrow-icon-revision" /></div>} */}
            </div>
          </div>
        )
      }
    }
  }

  _renderPaginationRev= (pageValue) =>  {
    if (pageValue === 1) {
      this.setState({whichTabs : true})
    }if (pageValue === 0) {
      this.setState({whichTabs : false})
    }
    if (this.state.whichTabs === true) {
      const web = this.props.displayMode === 'web';
      // const nextSalesRev = this.props.salesOrderRevised.NextPage;
      // const prevSalesRev = this.props.salesOrderRevised.PrevPage;
      const currentPropsRev = this.props.salesOrderRevised.PageNumber;
      const { TotalPages } = this.props.salesOrderRevised;
      
      return(
        <div className="paginations-rev">
          <div className="paging-rev">
            {/* {prevSalesRev && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
            {web && currentPropsRev - 3 > 0 && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev - 3 })} className="page-inactive-rev">{currentPropsRev - 3}</div>}
            {web && currentPropsRev - 2 > 0 && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev - 2 })} className="page-inactive-rev">{currentPropsRev - 2}</div>}
            {currentPropsRev - 1 > 0 && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev - 1 })} className="page-inactive-rev">{currentPropsRev - 1}</div>}
            <div className="page-active-rev">{currentPropsRev}</div>
            {currentPropsRev + 1 <= TotalPages && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev + 1 })} className="page-inactive-rev">{currentPropsRev + 1}</div>}
            {web && currentPropsRev + 2 < TotalPages && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev + 2 })} className="page-inactive-rev">{currentPropsRev + 2}</div>}
            {web && currentPropsRev + 3 < TotalPages && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev + 3 })} className="page-inactive-rev">{currentPropsRev + 3}</div>}
            {/* {nextSalesRev && <div onClick={() => this.props.updateSalesRevParameter({ ...this.props.salesRevisedParam.dataFilter, PageNumber: currentPropsRev + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
          </div>
        </div>
      )
    }
  }

  fetchSearchSales = async() => {
    await this.props.fetchSalesOrder(this.props.searchSalesParameter, this.props.token);
  } 

  fetchSearchService = async() => {
    await this.props.fetchServiceOrder(this.props.searchServiceParameter, this.props.token);
  }

  //SAAT MENGKLIK SERVICE ORDER TAB
  onClickServiceOrder = async() => {
   await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter, this.props.token);
  }

  //SAAT MENGKLIK SALES ORDER TAB
  onClickSalesOrder = async() =>{
    await this.props.fetchSalesOrder({
      ...this.props.salesParameter.dataFilter, 
      Filter : 
            [...this.props.salesParameter.dataFilter.Filter, {
              Field : 'LifeTimeComponent',
              Operator : "eq",
              Value : '-',
              Logic : "AND"
      }]
    }, this.props.token);
  }

  onClickRevisedSales = async() => {
    await this.props.fetchRevisedSales({
      ...this.props.salesRevisedParam.dataFilter,
      Filter : 
        [...this.props.salesRevisedParam.dataFilter.Filter, 
        {
          Field 	 : 'IsRevised',
          Operator : 'eq',
          Value 	 : 'true',
          Logic 	 : 'AND'
        },{
          Field    : 'IsChanged',
          Operator : 'eq',
          Value    : 'false',
          Logic    : "AND"
        },{
          Field : 'SAPIssueMessage',
          Operator : 'eq',
          Value : '-',
          Logic : 'AND'
        }]
    },this.props.token);
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
    if (Number(RoleUser.role()) === 2 || Number(RoleUser.role()) === 4 || Number(RoleUser.role()) === 9){
      if (this.state.whichTabs === true) {
        this.props.clearSelectedServicePlans();
        this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value})
      }
    } else{
      if (this.state.whichTabs === true) {
        this.props.clearSelectedSalesPlans();
        this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: value})
      }else{
        this.props.clearSelectedServicePlans();
        this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value})
      }
    }
  }

  _renderPagingRev(){
    return(
      <div className="bottom-row-rev">
        <div className="total-data-rev">
          *There are <b>{this.props.salesOrderRevised.TotalData} items </b>of sales orders that have not been revised.
        </div>
        {this.props.salesOrderRevised.Lists.length === 0 
          && this.props.fetchStatusRevised === ApiRequestActionsStatus.SUCCEEDED ? "" : this._renderPaginationRev()}
      </div>
    )
  }

  //KOMPONEN UNTUK GLOBAL SEARCH
  _renderSearchBar(){
    return (
      <div className="search-site">
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
    if (Number(RoleUser.role()) === 2 || Number(RoleUser.role()) === 4 || Number(RoleUser.role()) === 9){
      if (this.state.whichTabs === true) {
        setTimeout(() => {
          this.props.onSearchService(this.state.searchVal)
        }, 1000);
      }
    }else{
      if (this.state.whichTabs === true) {
        setTimeout(() => {
          this.props.onSearchSales(this.state.searchVal)
        }, 1000);
      }else {
        setTimeout(() => {
          this.props.onSearchService(this.state.searchVal)
        }, 1000);
      }
    }
      
	}

  _renderNotif(){
    return (
      <>
        <NotifButton 
          {...this.props}
          idNotif = "DetailSite"
        />
      </>
    )
  }

  handleClickFilterByDataAction = () =>{
    this.setState({
      isApproved : !this.state.isApproved
    })
  }

  //KOMPONEN UNTUK FILTER DATA ACTION
  _renderFilterByDataAction = () => {
    if (this.state.whichTabs === true) {
      return(
        <>
          <FilterbyDataAction 
            {...this.props}
            titles= "Status"
            idStatus= "DetailSite"
          />
        </>
      );
    }
    if (this.state.whichTabs === false) {
      return(
        <>
          <FilterbyDataAction 
            {...this.props}
            titles= "Status"
            idStatus= "DetailSite"
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

  changeSuccess = () => {
    this.setState({
      openSuccess : !this.state.openSuccess
    })
  }

  closeSuccess = () => {
    this.setState({
      openSuccess: !this.state.openSuccess
    })
  }

  //KOMPONEN UNTUK RENDER PAGE SALES ORDER DAN SERVICE ORDER
  _renderTabs(){
    return (
      <>
        <DetailsTab
          {...this.props}
          renderNotif={this._renderNotif()}
          renderFilterByDataAction={this._renderFilterByDataAction()} 
          renderSearch={this._renderSearchBar()}
          renderPaginationRev={this._renderPagingRev()}
          onClickSalesOrder={this.onClickSalesOrder}        
          onClickServiceOrder={this.onClickServiceOrder}
          onClickRevisedSales={this.onClickRevisedSales}
          onChoosedService={this.updateAssignmentServiceStates}
          onChoosedSales={this.updateAssignmentSalesStates}
          stats={this.state.stats}
          onStats={this.isChangeStat}     
          totalSalesData={this.props.salesOrderList.TotalData}
          totalServiceData={this.props.serviceOrderList.TotalData}
          ApprovedSalesData={this.props.salesOrderListApproved.TotalData}
          onClickTabHead={this.props.onClickSortBy}
          sortSalesByState={this.props.sortSalesBy}
          sortServiceByState={this.props.sortServiceBy}
          onPage={this._renderPagination}
          isApproved={this.state.isApproved}
          token={this.props.token}
        />
      </>
    );
  };

  render(){     
    return(
      <main className="content">
          <div className="table-detail-site">
              {this._renderTabs()}
          </div>
          <div></div>
          {Number(RoleUser.role()) === 2 || Number(RoleUser.role()) === 4 || Number(RoleUser.role()) === 9 
          ? <>
              {this.props.serviceOrderList.Lists.length === 0 && this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED ? "" :
                <div className="bottom-row-detail-site">
                    {this._renderShowPerPage()} {this._renderPagination()}
                </div>
              }
            </>
          : <>
              {this.props.salesOrderList.Lists.length === 0 && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "" :
                this.props.serviceOrderList.Lists.length === 0 && this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED ? "" :
                <div className="bottom-row-detail-site">
                    {this._renderShowPerPage()} {this._renderPagination()}
                </div>
              }
            </>
          }
      </main>
    )
  }
}

export default DetailPagesSite;