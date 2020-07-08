import React from 'react';
import moment from "moment";
import './ApprovalPages.scss';
import ApprovalTab from './ApprovalTab/ApprovalTab';
import { ApiRequestActionsStatus } from "../../../../../core/RestClientHelpers";
import DropDownList from '../../../../../components/DropdownList/DropDownList';
import SearchInput from "../../../../../components/Searchbar/SearchInput";
import BaseButton from '../../../../../components/Button/BaseButton';
import FilterbyDataAction from '../../../../../components/FilterByDataAction/FilterbyDataAction';
import NotifButton from '../../../../../components/ActionButton/NotifButton/NotifButton';
import ConfirmationModal from '../../../../../components/ConfirmationModal/ConfirmationModal';
import { CircularProgress } from '@material-ui/core';
import UnapproveConfirmation from '../../../../../components/UnapproveConfirmation/UnapproveConfirmation';

class ApprovalPages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stats: true,
      whichTabs: true,
      isShowPerPage: true,
      showPerPage: 0,
      isShowApproveSucceed: false,
      snak: true,
      openSuccess: false,
      openSuccessEdit: false
    };
  }

  componentWillUnmount = () => {
    this.props.updateServiceParameter({
      ...this.props.serviceParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.searchServiceParameter !== this.props.searchServiceParameter) {
      this.fetchSearchService();
    }
    if (prevProps.serviceParameter !== this.props.serviceParameter) {
      this.onClickServiceOrder();
    }

    // FILTER DROPDOWN
    if (prevProps.filterParameter !== this.props.filterParameter) {
      if (this.props.indexFilterParameter.indexTabParameter === 0) {
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter: this.props.filterParameter.Filter, PageNumber: 1
        })
      }
    }

    //FILTER RANGE LIFETIME
    if (this.state.whichTabs) {
      if (prevProps.filterLifetime !== this.props.filterLifetime) {
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter: this.props.filterLifetime.Filter, PageNumber: 1,
        })
      }
    }

    //FILTER RANGE DATE
    if (this.state.whichTabs) {
      if (prevProps.filterDate !== this.props.filterDate) {
        this.props.fetchServiceOrder(this.props.filterDate, this.props.token);
      }
    }

    // Trigger sales global search
    if (prevProps.salesSearch !== this.props.salesSearch) {
      this.props.updateSearchSales({
        ...prevProps.searchSalesParameter, Category: 'Approval', Keyword: this.props.salesSearch,
      });
    }

    //Trigger service global search
    if (prevProps.serviceSearch !== this.props.serviceSearch) {
      this.props.updateSearchService({
        ...prevProps.searchServiceParameter, Category: 'Approval', Keyword: this.props.serviceSearch,
      });
    }

    //Search per component
    if (this.state.whichTabs) {
      if (prevProps.searchComp !== this.props.searchComp) {
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter: this.props.searchComp, PageNumber: 1,
        });
      }
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
            Field: 'CustomerName',
            Direction: 'desc'
          }]
        });
        if (sortServiceBy.Customer.isAscending === !sortServiceBy.Customer.isActive) {
          isDescending = !sortServiceBy.Customer.isAscending;
          this.props.updateServiceParameter({
            ...this.props.serviceParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'CustomerName',
              Direction: 'asc'
            }]
          });
        }
      }
      if (sortServiceBy.Site.isActive) {
        isDescending = !sortServiceBy.Site.isAscending;
        this.props.updateServiceParameter({
          ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          Sort: [{
            Field: 'SiteCode',
            Direction: 'desc'
          }]
        });
        if (sortServiceBy.Site.isAscending === !sortServiceBy.Site.isActive) {
          isDescending = !sortServiceBy.Site.isAscending;
          this.props.updateServiceParameter({
            ...this.props.serviceParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'SiteCode',
              Direction: 'asc'
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
            Field: 'UnitModel',
            Direction: 'desc'
          }]
        });
        if (sortServiceBy.UnitModel.isAscending === !sortServiceBy.UnitModel.isActive) {
          isDescending = !sortServiceBy.UnitModel.isAscending;
          this.props.updateServiceParameter({
            ...this.props.serviceParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'UnitModel',
              Direction: 'asc'
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
            Field: 'ComponentDescription',
            Direction: 'desc'
          }]
        });
        if (sortServiceBy.CompDesc.isAscending === !sortServiceBy.CompDesc.isActive) {
          isDescending = !sortServiceBy.CompDesc.isAscending;
          this.props.updateServiceParameter({
            ...this.props.serviceParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'ComponentDescription',
              Direction: 'asc'
            }]
          });
        }
      };
    }
  }

  // PAGINATION DENGAN KONDISI UNTUK TAB SALES ORDER ATAU SERVICE ORDER
  _renderPagination = (pageValue) => {
    if (pageValue === 1) {
      this.setState({ whichTabs: true })
    } if (pageValue === 0) {
      this.setState({ whichTabs: false })
    }
    if (this.state.whichTabs === true) {
      const web = this.props.displayMode === 'web';
      const currentPropsService = this.props.serviceOrderList.PageNumber;
      const { TotalPages } = this.props.serviceOrderList;

      return (
        <div className="paginations">
          <div className="paging-approval">
            {web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive-approval">{currentPropsService - 3}</div>}
            {web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive-approval">{currentPropsService - 2}</div>}
            {currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive-approval">{currentPropsService - 1}</div>}
            <div className="page-active-approval">{currentPropsService}</div>
            {currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive-approval">{currentPropsService + 1}</div>}
            {web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive-approval">{currentPropsService + 2}</div>}
            {web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive-approval">{currentPropsService + 3}</div>}
          </div>
        </div>
      )
    }
  }

  fetchSearchService = async () => {
    await this.props.fetchServiceOrder(this.props.searchServiceParameter, this.props.token);
  }

  //SAAT MENGKLIK SERVICE ORDER TAB
  onClickServiceOrder = async () => {
    await this.props.fetchServiceOrder({
      ...this.props.serviceParameter.dataFilter,
      Filter:
        [...this.props.serviceParameter.dataFilter.Filter, {
          Field: 'SAPIssueMessage',
          Operator: "eq",
          Value: '-',
          Logic: "AND"
        }]
    }, this.props.token);
  }

  //KOMPONEN UNTUK SHOW PER/PAGE
  _renderShowPerPage() {
    return (
      <DropDownList
        {...this.props}
        handleClickShowPerPage={this.handleClickShowPerPage}
      />
    )
  }

  handleClickShowPerPage = (value) => {
    if (this.state.whichTabs === true) {
      this.props.clearSelectedServicePlans();
      this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value })
    }
  }

  //KOMPONEN UNTUK GLOBAL SEARCH
  _renderSearchBar() {
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

  handleSearch = (value) => {
    this.setState({ searchVal: value })
    if (this.state.whichTabs === true) {
      setTimeout(() => {
        this.props.onSearchService(this.state.searchVal)
      }, 1000);
    }
  }

  _renderNotif() {
    return (
      <>
        <NotifButton
          {...this.props}
          idNotif="Non-Status"
        />
      </>
    )
  }

  //FUNGSI UNTUK MENGAPROVE SERVICE ORDER
  onClickApprovedService = () => {
    this.props.fetchApprovedService(this.props.serviceParameter.dataFilter, this.props.token);
  }

  handleServiceApprove = async () => {
    let arr = []
    const index = this.props.selectedServicePlans.length
    if (this.props.selectedServicePlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedServicePlans[i].WoNumber]
      }
      await this.props.approveService({ WoNumbers: arr, IsApprove: true }, this.props.token)
      this.onClickServiceOrder();
      await this.props.clearSelectedServicePlans();
    }
  }

  handleClickFilterByDataAction = () => {
    this.setState({
      isApproved: !this.state.isApproved
    })
  }

  _renderFilterByDataAction() {
    if (this.state.whichTabs === true) {
      return (
        <>
          <FilterbyDataAction
            {...this.props}
            titles="Status"
          />
        </>
      );
    }
  };

  // Menampilkan pop up berhasil approve
  changeSuccess = () => {
    this.setState({
      openSuccess: !this.state.openSuccess
    })
  }

  closeSuccess = () => {
    this.setState({
      openSuccess: !this.state.openSuccess
    })
  }
  
  renderCircularProgress() {
    return <CircularProgress size={100} className="circular-progress" />;
  }

  _renderSalesApproved = () => {
    return (
      <>
        <ConfirmationModal idModal="Approved" openModal={this.state.openSuccess} onClose={this.closeSuccess} />
      </>
    )
  }

  //Komponen untuk menampilkan button
  _renderBaseButton() {
    if (this.state.whichTabs === true) {
      return (
        <div className="header-rows">
          <BaseButton titles="Approve"
            {...this.props}
            whatTabsIsRendered={this.state.whichTabs}
            disabledButton={this.props.selectedServicePlans.length < 1}
            totalSelectedItems={this.props.selectedServicePlans.length}
            handleServiceApprove={this.handleServiceApprove}
            renderSakses={this.changeSuccess}
          />
          <BaseButton titles="Reject"
            {...this.props}
            whichTabs={this.state.whichTabs}
            selectedDataSAP={this.props.selectedServicePlans}
            whatTabsIsRendered={this.state.whichTabs}
            disabledButton={this.props.selectedServicePlans.length < 1}
            totalSelectedItems={this.props.selectedServicePlans.length}
            selectedData={this.state.selectedData}
          />
        </div>
      );
    }
  };

  //FUNGSI UNTUK MULTI SELECT SERVICE ORDER
  updateAssignmentServiceStates = (plan) => {
    if (this.props.selectedServicePlans
      .some((plans) => plans.WoNumber === plan.WoNumber,
    )) { return this.props.unselectServicePlan(plan); }
    return this.props.selectServicePlan(plan);
  };

  //KOMPONEN UNTUK RENDER PAGE SALES ORDER DAN SERVICE ORDER
  _renderTabs() {
    return (
      <>
        <ApprovalTab
          {...this.props}
          renderNotif={this._renderNotif()}
          renderFilterByDataAction={this._renderFilterByDataAction()}
          renderBaseButton={this._renderBaseButton()}
          renderSearch={this._renderSearchBar()}
          onClickServiceOrder={this.onClickServiceOrder}
          onChoosedService={this.updateAssignmentServiceStates}
          selectedServicePlanList={this.props.selectedServicePlans}
          displayServiceCheckbox={this.props.serviceParameter.paramsData.assigmentFilter || this.props.serviceParameter.paramsData.inProgressFilter}
          stats={this.state.stats}
          totalServiceData={this.props.serviceOrderList.TotalData}
          onClickTabHead={this.props.onClickSortBy}
          sortServiceByState={this.props.sortServiceBy}
          onPage={this._renderPagination}
          isApproved={this.state.isApproved}
          token={this.props.token}
        />
      </>
    );
  };

  render() {
    return (
      <main className="content">
        {/* {this.props.fetchStatusApprovedSales === ApiRequestActionsStatus.LOADING && (
          this.renderCircularProgress()
        )}
        {this.props.fetchStatusApprovedSales === ApiRequestActionsStatus.SUCCEEDED && (
          <>
            {this._renderSalesApproved()}
          </>
        )} */}
        {this.props.fetchStatusApprovedService === ApiRequestActionsStatus.LOADING && (
          this.renderCircularProgress()
        )}
        {this.props.fetchStatusApprovedService === ApiRequestActionsStatus.SUCCEEDED && (
          <>
            {this._renderSalesApproved()}
          </>
        )}
        {this.props.fetchStatusSalesDeleted === ApiRequestActionsStatus.LOADING && (
          this.renderCircularProgress()
        )}
        {this.props.fetchStatusSalesDeleted === ApiRequestActionsStatus.SUCCEEDED && (
          <>
            {this._renderSalesDeleted()}
          </>
        )}
        {this.props.fetchStatusServiceDeleted === ApiRequestActionsStatus.LOADING && (
          this.renderCircularProgress()
        )}
        {this.props.fetchStatusServiceDeleted === ApiRequestActionsStatus.SUCCEEDED && (
          <>
            {this._renderSalesDeleted()}
          </>
        )}
        {this.props.fetchStatusUnapprove === ApiRequestActionsStatus.LOADING && (
          this.renderCircularProgress()
        )}
        {this.props.fetchStatusUnapprove === ApiRequestActionsStatus.SUCCEEDED && (
          this._renderEditSuccess()
        )}
        <div className="table-container-approval">
          {this._renderTabs()}
        </div>
        <div></div>
        {this.props.salesOrderList.Lists.length === 0 && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "" :
          this.props.serviceOrderList.Lists.length === 0 && this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED ? "" :
            <div className="bottom-row-approval">
              {this._renderShowPerPage()} {this._renderPagination()}
            </div>
        }
      </main>
    )
  }
}

export default ApprovalPages;