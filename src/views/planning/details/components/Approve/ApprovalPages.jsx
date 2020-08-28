import React from 'react';
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
    this.props.updateSalesParameter({
      ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
    });
    this.props.updateServiceParameter({
      ...this.props.serviceParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.salesParameter !== this.props.salesParameter) {
      this.onClickSalesOrder();
    }
    if (prevProps.searchSalesParameter !== this.props.searchSalesParameter) {
      this.fetchSearchSales();
    }
    if (prevProps.searchServiceParameter !== this.props.searchServiceParameter) {
      this.fetchSearchService();
    }
    if (prevProps.serviceParameter !== this.props.serviceParameter) {
      this.onClickServiceOrder();
    }

    // FILTER DROPDOWN
    if (prevProps.filterParameter !== this.props.filterParameter) {
      if (this.props.indexFilterParameter.indexTabParameter === 0) {
        this.props.updateSalesParameter({
          ...prevProps.salesParameter.dataFilter, Filter: this.props.filterParameter.Filter, PageNumber: 1
        })
      } else {
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter: this.props.filterParameter.Filter, PageNumber: 1
        })
      }
    }

    //FILTER RANGE LIFETIME
    if (this.state.whichTabs) {
      if (prevProps.filterLifetime !== this.props.filterLifetime) {
        this.props.updateSalesParameter({
          ...prevProps.salesParameter.dataFilter, Filter: this.props.filterLifetime.Filter, PageNumber: 1,
        })
      }
    } else {
      if (prevProps.filterLifetime !== this.props.filterLifetime) {
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter: this.props.filterLifetime.Filter, PageNumber: 1,
        })
      }
    }

    //FILTER RANGE SMR
    if (this.state.whichTabs) {
      if (prevProps.filterSmr !== this.props.filterSmr) {
        this.props.updateSalesParameter({
          ...prevProps.salesParameter.dataFilter, Filter: this.props.filterSmr.Filter, PageNumber: 1,
        })
      }
    } else {
      if (prevProps.filterSmr !== this.props.filterSmr) {
        this.props.updateServiceParameter({
          ...prevProps.serviceParameter.dataFilter, Filter: this.props.filterSmr.Filter, PageNumber: 1,
        })
      }
    }

    //FILTER RANGE DATE
    if (this.state.whichTabs) {
      if (prevProps.filterDate !== this.props.filterDate) {
        this.props.fetchSalesOrder(this.props.filterDate, this.props.token);
      }
    } else {
      if (prevProps.filterDate !== this.props.filterDate) {
        this.props.fetchServiceOrder(this.props.filterDate, this.props.token);
      }
    }

    //FILTER RANGE SMR DATE
    if (this.state.whichTabs) {
      if (prevProps.filterDateSmr !== this.props.filterDateSmr) {
        this.props.fetchSalesOrder(this.props.filterDateSmr, this.props.token);
      }
    } else {
      if (prevProps.filterDateSmr !== this.props.filterDateSmr) {
        this.props.fetchServiceOrder(this.props.filterDateSmr, this.props.token);
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
        if (this.props.searchComp[0].Value === "") {
          this.props.updateSalesParameter({
            ...prevProps.salesParameter.dataFilter, Filter: this.props.searchComp.Value = "",
          });
        } else {
          this.props.updateSalesParameter({
            ...prevProps.salesParameter.dataFilter, Filter: this.props.searchComp, PageNumber: 1,
          });
        }
      }
    } else {
      if (prevProps.searchComp !== this.props.searchComp) {
        if (this.props.searchComp[0].Value === "") {
          this.props.updateServiceParameter({
            ...prevProps.serviceParameter.dataFilter, Filter: this.props.searchComp.Value = "",
          });
        } else {
          this.props.updateServiceParameter({
            ...prevProps.serviceParameter.dataFilter, Filter: this.props.searchComp, PageNumber: 1,
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
            Field: 'CustomerName',
            Direction: 'desc'
          }],
        });
        if (sortSalesBy.Customer.isAscending === !sortSalesBy.Customer.isActive) {
          isDescending = !sortSalesBy.Customer.isAscending;
          this.props.updateSalesParameter({
            ...this.props.salesParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'CustomerName',
              Direction: 'asc'
            }],
          });
        }
      }
      if (sortSalesBy.Site.isActive) {
        isDescending = !sortSalesBy.Site.isAscending;
        this.props.updateSalesParameter({
          ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          Sort: [{
            Field: 'SiteCode',
            Direction: 'desc'
          }],
        });
        if (sortSalesBy.Site.isAscending === !sortSalesBy.Site.isActive) {
          isDescending = !sortSalesBy.Site.isAscending;
          this.props.updateSalesParameter({
            ...this.props.salesParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'SiteCode',
              Direction: 'asc'
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
            Field: 'UnitModel',
            Direction: 'desc'
          }],
        });
        if (sortSalesBy.UnitModel.isAscending === !sortSalesBy.UnitModel.isActive) {
          isDescending = !sortSalesBy.UnitModel.isAscending;
          this.props.updateSalesParameter({
            ...this.props.salesParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'UnitModel',
              Direction: 'asc'
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
            Field: 'ComponentDescription',
            Direction: 'desc'
          }],
        });
        if (sortSalesBy.CompDesc.isAscending === !sortSalesBy.CompDesc.isActive) {
          isDescending = !sortSalesBy.CompDesc.isAscending;
          this.props.updateSalesParameter({
            ...this.props.salesParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'ComponentDescription',
              Direction: 'asc'
            }]
          });
        }
      };
      if (sortSalesBy.PlanType.isActive) {
        isDescending = !sortSalesBy.PlanType.isAscending;
        this.props.updateSalesParameter({
          ...this.props.salesParameter.dataFilter,
          PageNumber: 1,
          Sort: [{
            Field: 'PlanType',
            Direction: 'desc'
          }],
        });
        if (sortSalesBy.PlanType.isAscending === !sortSalesBy.PlanType.isActive) {
          isDescending = !sortSalesBy.PlanType.isAscending;
          this.props.updateSalesParameter({
            ...this.props.salesParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'PlanType',
              Direction: 'asc'
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
      if (sortServiceBy.PlanType.isActive) {
        isDescending = !sortServiceBy.PlanType.isAscending;
        this.props.updateServiceParameter({
          ...this.props.serviceParameter.dataFilter,
          PageNumber: 1,
          Sort: [{
            Field: 'PlanType',
            Direction: 'desc'
          }]
        });
        if (sortServiceBy.PlanType.isAscending === !sortServiceBy.PlanType.isActive) {
          isDescending = !sortServiceBy.PlanType.isAscending;
          this.props.updateServiceParameter({
            ...this.props.serviceParameter.dataFilter,
            PageNumber: 1,
            Sort: [{
              Field: 'PlanType',
              Direction: 'asc'
            }]
          });
        }
      }
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
      // const nextSales = this.props.salesOrderList.NextPage;
      // const prevSales = this.props.salesOrderList.PrevPage;
      const currentPropsSales = this.props.salesOrderList.PageNumber;
      const { TotalPages } = this.props.salesOrderList.Lists;

      return (
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
      // const nextSales = this.props.serviceOrderList.NextPage;
      // const prevSales = this.props.serviceOrderList.PrevPage;
      const currentPropsService = this.props.serviceOrderList.PageNumber;
      const { TotalPages } = this.props.serviceOrderList.Lists;

      return (
        <div className="paginations">
          <div className="paging-approval">
            {/* {prevSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page-approval"><KeyboardArrowLeft className="arrow-icon-approval" /></div>} */}
            {web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive-approval">{currentPropsService - 3}</div>}
            {web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive-approval">{currentPropsService - 2}</div>}
            {currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive-approval">{currentPropsService - 1}</div>}
            <div className="page-active-approval">{currentPropsService}</div>
            {/* <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService })} className="page-active">{currentPropsService}</div> */}
            {currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive-approval">{currentPropsService + 1}</div>}
            {web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive-approval">{currentPropsService + 2}</div>}
            {web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive-approval">{currentPropsService + 3}</div>}
            {/* {nextSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page-approval"><KeyboardArrowRight className="arrow-icon-approval" /></div>} */}
          </div>
        </div>
      )
    }
  }

  fetchSearchSales = async () => {
    await this.props.fetchSalesOrder(this.props.searchSalesParameter, this.props.token);
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

  //SAAT MENGKLIK SALES ORDER TAB
  onClickSalesOrder = async () => {
    if (this.props.location.whichTab === 'lifetime') {
      await this.props.fetchSalesOrder({
        ...this.props.salesParameter.dataFilter,
        Filter:
          [...this.props.salesParameter.dataFilter.Filter, {
            Field: 'LifeTimeComponent',
            Operator: "eq",
            Value: 0,
            Logic: "AND"
          }]
      }, this.props.token);
    } else {
      await this.props.fetchSalesOrder({
        ...this.props.salesParameter.dataFilter,
        Filter:
          [...this.props.salesParameter.dataFilter.Filter, {
            Field: 'LifeTimeComponent',
            Operator: "neq",
            Value: 0,
            Logic: "AND"
          }, {
            Field: 'SAPIssueMessage',
            Operator: 'eq',
            Value: '-',
            Logic: 'AND'
          }, {
            Field: 'IsRevised',
            Operator: 'eq',
            Value: 'false',
            Logic: 'AND'
          }]
      }, this.props.token);
    }
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
      this.props.clearSelectedSalesPlans();
      this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: value })
    } else {
      this.props.clearSelectedServicePlans();
      this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value })
    }
  }

  resetFilter = () => {
    this.props.updateSalesParameter({
      ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
    });
    this.props.selectedFilters.customerType= "All Customer"
    this.props.selectedFilters.siteType= "All Site"
    this.props.selectedFilters.unitType= "All Unit Model"
    this.props.selectedFilters.compType= "All Component"
    this.props.selectedFilters.planType= "All Plan Type"
    this.props.filterParameter.Filter.length = 0
  }
  
  //KOMPONEN UNTUK GLOBAL SEARCH
  _renderSearchBar() {
    return (
      <div className="bottom-row-approval">
        <BaseButton titles= "Reset"
          {...this.props}
          whatTabsIsRendered= {this.state.whichTabs}
          resetFilter = {this.resetFilter}
        />
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
        this.props.onSearchSales(this.state.searchVal)
      }, 1000);
    } if (this.state.whichTabs === false) {
      setTimeout(() => {
        this.props.onSearchService(this.state.searchVal)
      }, 1000);
    }
  }

  _renderNotif() {
    return (
      <>
        <FilterbyDataAction
          {...this.props}
          titles="Input Lifetime"
        />
        <NotifButton
          {...this.props}
          idNotif="Non-Status"
        />
      </>
    )
  }

  //FUNGSI UNTUK MENGAPROVE SALES ORDER
  onClickApprovedSales = () => {
    this.props.fetchApprovedSales(this.props.salesParameter.dataFilter, this.props.token);
  }
  //FUNGSI UNTUK MENGAPROVE SERVICE ORDER
  onClickApprovedService = () => {
    this.props.fetchApprovedService(this.props.serviceParameter.dataFilter, this.props.token);
  }

  handleSalesApprove = async () => {
    let arr = []
    const index = this.props.selectedSalesPlans.length
    if (this.props.selectedSalesPlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedSalesPlans[i].SoNumber]
      }
      await this.props.approveSales({ SoNumbers: arr, IsApprove: true }, this.props.token)
      this.onClickSalesOrder();
      await this.props.clearSelectedSalesPlans();
    }
  };

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

  handleSendtoEdit = async () => {
    let arr = []
    const index = this.props.selectedSalesPlans.length
    if (this.props.selectedSalesPlans.length > 0) {
      for (let i = 0; i < index; i++) {
        arr = [...arr, this.props.selectedSalesPlans[i].SoNumber]
      }
      await this.props.unapproveSales({ SoNumbers: arr }, this.props.token)
      this.setState({
        openSuccessEdit: !this.state.openSuccessEdit
      })
      await this.props.clearSelectedSalesPlans();
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
    if (this.state.whichTabs === false) {
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

  isChangeStat = (value, key) => {
    this.setState({
      lifetime: { Lists: this.state.lifetime.Lists.map(el => (el.SoNumber === key ? { ...el, LifeTimeComp: value } : el)) }
    });
  };

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

  closeSuccessEdit = () => {
    this.setState({
      openSuccessEdit: !this.state.openSuccessEdit
    })
    this.onClickSalesOrder();
  }

  renderCircularProgress() {
    return <CircularProgress size={100} className="circular-progress" />;
  }

  _updateAssignmentSalesStatesAll = (dataBoolean) => {
    this.props.selectAllSales(dataBoolean)
  }

  _updateAssignmentServiceStatesAll = (dataBoolean) => {
    this.props.selectAllService(dataBoolean)
  }

  _renderSalesApproved = () => {
    return (
      <>
        <ConfirmationModal idModal="Approved" openModal={this.state.openSuccess} onClose={this.closeSuccess} />
      </>
    )
  }

  _renderSalesDeleted = () => {
    return (
      <>
        <ConfirmationModal idModal="Delete Success" openModal={this.state.openSuccess} onClose={this.closeSuccess} />
      </>
    )
  }
  _renderEditSuccess = () => {
    return (
      <>
        <UnapproveConfirmation idConfirm="Send Success" openModal={this.state.openSuccessEdit} onClose={this.closeSuccessEdit} />
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
            disabledButton={this.props.selectedSalesPlans.length < 1}
            totalSelectedItems={this.props.selectedSalesPlans.length}
            handleSalesApprove={this.handleSalesApprove}
            renderSakses={this.changeSuccess}
          />
          <BaseButton titles="Reject"
            {...this.props}
            whichTabs={this.state.whichTabs}
            idCancel="Sales"
            idReject="Sales"
            selectedDataSAP={this.props.selectedSalesPlans}
            whatTabsIsRendered={this.state.whichTabs}
            disabledButton={this.props.selectedSalesPlans.length < 1}
            totalSelectedItems={this.props.selectedSalesPlans.length}
            handleSendtoEdit={this.handleSendtoEdit}
            selectedData={this.state.selectedData}
            renderSakses={this.changeSuccess}
            onClicksalesOrder={this.onClicksalesOrder}
          />
        </div>
      );
    }
    if (this.state.whichTabs === false) {
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

  //FUNGSI UNTUK MULTI SELECT SALES ORDER
  updateAssignmentSalesStates = (plan) => {
    if (this.props.selectedSalesPlans
      .some((plans) => plans.SoNumber === plan.SoNumber,
      )) { return this.props.unselectSalesPlan(plan); }
    return this.props.selectSalesPlan(plan);
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
          onClickSalesOrder={this.onClickSalesOrder}
          onClickServiceOrder={this.onClickServiceOrder}
          onChoosedService={this.updateAssignmentServiceStates}
          onChoosedSales={this.updateAssignmentSalesStates}
          onChooseSelectAll={this._updateAssignmentSalesStatesAll}
          onChooseAllService= {this._updateAssignmentServiceStatesAll}
          selectedSalesPlanList={this.props.selectedSalesPlans}
          selectedServicePlanList={this.props.selectedServicePlans}
          displaySalesCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
          displayServiceCheckbox={this.props.serviceParameter.paramsData.assigmentFilter || this.props.serviceParameter.paramsData.inProgressFilter}
          stats={this.state.stats}
          onStats={this.isChangeStat}
          totalSalesData={this.props.salesOrderList.TotalDataApproval}
          totalServiceData={this.props.serviceOrderList.TotalData}
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

  render() {
    return (
      <main className="content">
        {this.props.fetchStatusApprovedSales === ApiRequestActionsStatus.LOADING && (
          this.renderCircularProgress()
        )}
        {this.props.fetchStatusApprovedSales === ApiRequestActionsStatus.SUCCEEDED && (
          <>
            {this._renderSalesApproved()}
          </>
        )}
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