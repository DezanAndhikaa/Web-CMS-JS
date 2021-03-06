/*eslint-disable no-unused-vars*/
import React from 'react';
import './DetailPages.scss';
import PlanningDetailsTab from './components/Tab/PlanningDetailsTab';
import DropDownList from 'components/DropdownList/DropDownList';
import SearchInput from "components/Searchbar/SearchInput";
import FilterbyDataAction from 'components/FilterByDataAction/FilterbyDataAction';
import NotifButton from 'components/ActionButton/NotifButton/NotifButton';
import { Menu } from 'constants/index';
import { ApiRequestActionsStatus } from 'core/RestClientHelpers';
import BaseButton from 'components/Button/BaseButton';

class DetailPages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stats: true,
      isShowPerPage: true,
      showPerPage: 0,
      whichTabs: true,
      isApproved: false,
      snak: true
    };
  }

  handleClick = (menu) => {
    this.props.push(menu);
  }

  componentWillUnmount = () => {
    this.props.updateSalesParameter({
      ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
    });
  }

  componentDidMount = () => {
    if (this.props.location.whichTab === undefined) {
      this.handleClick(Menu.PLANNING_INPUT_LIFETIME)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.salesParameter !== this.props.salesParameter) {
      this.onClickSalesOrder()
    }

    if (prevProps.searchSalesParameter !== this.props.searchSalesParameter) {
      this.fetchSearchSales();
    }
    
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

    if (prevProps.filterLifetime !== this.props.filterLifetime) {
      this.props.updateSalesParameter({
        ...prevProps.serviceParameter.dataFilter, Filter: this.props.filterLifetime.Filter, PageNumber: 1
      })
    }

    if(this.state.whichTabs){
      if (prevProps.filterSmr !== this.props.filterSmr) {
        this.props.updateSalesParameter({
          ...prevProps.salesParameter.dataFilter, Filter: this.props.filterSmr.Filter, PageNumber: 1,
        })
      }
    }

    if (this.state.whichTabs) {
      if (prevProps.filterDateSalesSite !== this.props.filterDateSalesSite) {
        this.props.updateSalesParameter({
          ...prevProps.salesParameter.dataFilter, Filter: this.props.filterDateSalesSite.Filter, PageNumber: 1
        })
      }
    }

    if (this.state.whichTabs) {
      if (prevProps.filterDateSmrSalesSite !== this.props.filterDateSmrSalesSite) {
        this.props.fetchSalesOrder(this.props.filterDateSmrSalesSite, this.props.token);
      }
    }

    if (prevProps.salesSearch !== this.props.salesSearch) {
      this.props.updateSearchSales({
        ...prevProps.searchSalesParameter, Category: 'Lifetime', Keyword: this.props.salesSearch,
      });
    }

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
    }

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
              Field : 'PlanType',
              Direction : 'desc'
            }],
        });
        if (sortSalesBy.PlanType.isAscending === !sortSalesBy.PlanType.isActive) {
          isDescending = !sortSalesBy.PlanType.isAscending;
          this.props.updateSalesParameter({
            ...this.props.salesParameter.dataFilter,
              PageNumber: 1,
              Sort: [{
                Field : 'PlanType',
                Direction : 'asc'
              }]
          });
        }
      };
    }
  }

  fetchSearchSales = async () => {
    await this.props.fetchSalesOrder(this.props.searchSalesParameter, this.props.token);
  }
  
  _renderPagination = (pageValue) => {
    if (pageValue === 1) {
      this.setState({ whichTabs: true })
    } if (pageValue === 0) {
      this.setState({ whichTabs: false })
    }
    if (this.state.whichTabs === true) {
      const web = this.props.displayMode === 'web';
      const currentPropsSales = this.props.salesOrderList.Meta.pageNumber;
      const { PaginationLifetime } = this.props.salesOrderList.Data.Lists;

      return (
        <div className="pagination">
          <div className="paging">
            {web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
            {web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
            {currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
            <div className="page-active">{currentPropsSales}</div>
            {currentPropsSales + 1 <= PaginationLifetime && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
            {web && currentPropsSales + 2 < PaginationLifetime && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
            {web && currentPropsSales + 3 < PaginationLifetime && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
          </div>
        </div>
      )
    }
  }

  onClickServiceOrder = async () => {
    await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter, this.props.token);
  }

  onClickSalesOrder = async () => {
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
  }

  _renderShowPerPage = () => {
    return (
      <DropDownList
        {...this.props}
        handleClickShowPerPage={this.handleClickShowPerPage}
      />
    )
  }

  handleClickShowPerPage = async (value) => {
    if (this.state.whichTabs === true) {
      await this.props.clearSelectedSalesPlans();
      await this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: value })
    } else if (this.state.whichTabs === false) {
      await this.props.clearSelectedServicePlans();
      await this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value })
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

  _renderSearchBar() {
    return (
      <>
        <div className="bottom-row">
          <BaseButton titles= "Reset"
            {...this.props}
            whatTabsIsRendered= {this.state.whichTabs}
            resetFilter = {this.resetFilter}
          />
          <SearchInput
            {...this.props}
            whichTabs={this.state.whichTabs}
            webInfo="Search"
            handleSearch={this.handleSearch}
          />
        </div>
      </>
    );
  }

  _renderSearchBarRevision() {
    return (
      <>
        <div className="bottom-row">
          <SearchInput
            {...this.props}
            whichTabs={this.state.whichTabs}
            webInfo="Search Revision List"
            handleSearch={this.handleSearchRevision}
          />
        </div>
      </>
    );
  }

  handleSearch = (value) => {
    this.setState({ searchVal: value })
    if (this.state.whichTabs === true) {
      setTimeout(() => {
        this.props.onSearchSales(this.state.searchVal)
      }, 1000);
    }
  }

  handleSearchRevision = (value) => {
    this.setState({ searchVal: value })
    if (this.state.whichTabs === true) {
      setTimeout(() => {
        this.props.onSearchSales(this.state.searchVal)
      }, 1000);
    }
  }

  _renderNotif() {
    return (
      <NotifButton
        {...this.props}
        idNotif="Non-Status"
      />
    )
  }

  handleClickFilterByDataAction = () => {
    this.setState({
      isApproved: !this.state.isApproved
    })
  }

  _renderFilterByDataAction = (value) => {
    if (value === 1) {
      this.setState({ whichTabs: true })
    } if (value === 0) {
      this.setState({ whichTabs: false })
    }
    if (this.state.whichTabs === true) {
      return (
        <>
          <FilterbyDataAction
            {...this.props}
            titles="Status"
            onClickPlanningApprove={this.onClickApprovedSales}
            onClickPlanningDelete={this.onClickDeletedSales}
            onClickButton={this.handleClickFilterByDataAction}
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
            onClickPlanningApprove={this.onClickApprovedService}
            onClickPlanningDelete={this.onClickDeletedService}
            onClickButton={this.handleClickFilterByDataAction}
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

  updateAssignmentSalesStates = (plan) => {
    if (this.props.selectedSalesPlans
      .some((plans) => plans.SoNumber === plan.SoNumber,
    )) { return this.props.unselectSalesPlan(plan); }
    return this.props.selectSalesPlan(plan);
  };

  updateAssignmentServiceStates = (plan) => {
    if (this.props.selectedServicePlans
      .some((plans) => plans.WoNumber === plan.WoNumber,
    )) { return this.props.unselectServicePlan(plan); }
    return this.props.selectServicePlan(plan);
  };

  _renderTabs() {
    return (
      <>
        <PlanningDetailsTab
          {...this.props}
          renderFilterByDataAction={this._renderFilterByDataAction()}
          renderSearch={this._renderSearchBar()}
          renderNotif={this._renderNotif()}
          renderSearchRevision={this._renderSearchBarRevision}
          onClickSalesOrder={this.onClickSalesOrder}
          onChoosedService={this.updateAssignmentServiceStates}
          onChoosedSales={this.updateAssignmentSalesStates}
          selectedSalesPlanList={this.props.selectedSalesPlans}
          selectedServicePlanList={this.props.selectedServicePlans}
          displaySalesCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
          displayServiceCheckbox={this.props.serviceParameter.paramsData.assigmentFilter || this.props.serviceParameter.paramsData.inProgressFilter}
          stats={this.state.stats}
          onStats={this.isChangeStat}
          totalSalesData={this.props.salesOrderList.Meta.TotalDataLifetime}
          onClickTabHead={this.props.onClickSortBy}
          sortSalesByState={this.props.sortSalesBy}
          sortServiceByState={this.props.sortServiceBy}
          onPage={this._renderPagination}
          isApproved={this.state.isApproved}
        />

      </>

    );
  };

  render() {
    return (
      <main className="content">
        <div className="table-container">
          {this._renderTabs()}
        </div>
        <div></div>
        {this.props.salesOrderList.Data.Lists.length === 0 && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "" :
          <div className="bottom-row">
            {this._renderShowPerPage()} {this._renderPagination()}
          </div>
        }
      </main>
    )
  }
}

export default DetailPages;