import React from "react";
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Drawer,
  Collapse
} from "@material-ui/core";
import { AssignmentIcon, IcDbMenu, IcApproval, AllocationIcon, DeliveryIcon, TrackingIcon, 
  ProductionIcon, ExecutionIcon, DashboardIcon, PlanningIcon } from "assets/icons";
import { Menu } from 'constants/index';
import "./SideMenuComponent.scss";
import roleService from "utils/roleService.helper";

const RoleUser = new roleService();
class SideMenuComponent extends React.Component {

  handleClick(menu, subMenu) {
    this.props.clickMenu(menu, subMenu);
    if (menu === Menu.PLANNING) {
      if (subMenu !== "") this.props.push(subMenu);
    }else {
      this.props.push(menu);
    }
    window.localStorage.setItem('subMenu', subMenu);
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

  render() {
    let drawer = null;
    if (
      this.props.path !== Menu.LOGIN &&
      this.props.path !== `${Menu.LOGIN}/`
    ) {
      drawer = (
        <Drawer
          className="menu"
          variant={this.props.displayMode === "web" ? "permanent" : "temporary"}
          classes={{ paper: "drawer-paper", docked: "docked" }}
          anchor="left"
          open={this.props.menuDrawerState}
          onClose={() => this.props.closeDrawer()}
        >
          <List>
            {/* Dashboard */}
            <ListItem
              button
              key="dashboard"
              className={
                this.props.path === Menu.DASHBOARD
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.DASHBOARD, "")}
            >
              <ListItemIcon classes={{ root: "icon-root" }}>
                <img
                  src={DashboardIcon}
                  alt="assignment icon"
                  className="item-icon"
                />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                classes={{ primary: "item-text", root: "item-text" }}
              />
            </ListItem>
            {/* Tracking */}
            <ListItem
              button
              key="jobs"
              className={
                this.props.path === (Menu.TRACKING)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.TRACKING, "")}
            >
              <ListItemIcon classes={{ root: "icon-root" }}>
                <img
                  src={TrackingIcon}
                  alt="assignment icon"
                  className="item-icon"
                />
              </ListItemIcon>
              <ListItemText
                primary="Tracking"
                classes={{ primary: "item-text", root: "item-text" }}
              />
            </ListItem>
            {/* Planning */}
            <ListItem
              button
              key="plans"
              className={
                this.props.path === (Menu.PLANNING)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.PLANNING, "")}
            >
              <ListItemIcon classes={{ root: "icon-root" }}>
                <img
                  src={PlanningIcon}
                  alt="assignment icon"
                  className="item-icon"
                />
              </ListItemIcon>
              <ListItemText
                primary="Planning"
                classes={{ primary: "item-text", root: "item-text" }}
              />
            </ListItem>
            <Collapse
              in={this.props.plansMenuExpanded}
              timeout="auto"
              unmountOnExit
            >
              {Number(RoleUser.role()) === 1 
                ? <List disablePadding>
                    <ListItem
                      button
                      key="plans-assignment"
                      className={
                        this.props.path === Menu.PLANNING_DASHBOARD 
                          ? "sub-menu-selected"
                          : "sub-menu"
                      }
                      onClick={() => this.handleClick(Menu.PLANNING, Menu.PLANNING_DASHBOARD)}
                    >
                      <ListItemIcon classes={{ root: "icon-root" }}>
                        <img
                          src={IcDbMenu}
                          alt="assignment icon"
                          className="item-icon"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Dashboard"
                        classes={{ primary: "item-text", root: "item-text" }}
                      />
                    </ListItem>
                    <ListItem
                      button
                      key="jobs-report"
                      className={
                        this.props.path === Menu.PLANNING_HO || this.props.path === Menu.PLANNING_TRACKING_HISTORY || this.props.path === Menu.PLANNING_ALL_NOTIF
                          ? "sub-menu-selected"
                          : "sub-menu"
                      }
                      onClick={() => this.handleClick(Menu.PLANNING, Menu.PLANNING_HO)}
                    >
                      <ListItemIcon classes={{ root: "icon-root" }}>
                        <img
                          src={IcApproval}
                          alt="assignment icon"
                          className="item-icon"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="HO"
                        classes={{ primary: "item-text", root: "item-text" }}
                      />
                    </ListItem>
                    <ListItem
                      button
                      key="jobs-report"
                      className={
                        this.props.path === Menu.PLANNING_SITE
                          ? "sub-menu-selected"
                          : "sub-menu"
                      }
                      onClick={() => this.handleClick(Menu.PLANNING, Menu.PLANNING_SITE)}
                    >
                      <ListItemIcon classes={{ root: "icon-root" }}>
                        <img
                          src={AssignmentIcon}
                          alt="assignment icon"
                          className="item-icon"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Site"
                        classes={{ primary: "item-text", root: "item-text" }}
                      />
                    </ListItem>
                  </List>
                : <List disablePadding>
                  <ListItem
                    button
                    key="plans-assignment"
                    className={
                      this.props.path === Menu.PLANNING_DASHBOARD 
                        ? "sub-menu-selected"
                        : "sub-menu"
                    }
                    onClick={() => this.handleClick(Menu.PLANNING, Menu.PLANNING_DASHBOARD)}
                  >
                    <ListItemIcon classes={{ root: "icon-root" }}>
                      <img
                        src={IcDbMenu}
                        alt="assignment icon"
                        className="item-icon"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dashboard"
                      classes={{ primary: "item-text", root: "item-text" }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    key="jobs-report"
                    className={
                      this.props.path === Menu.PLANNING_SITE
                        ? "sub-menu-selected"
                        : "sub-menu"
                    }
                    onClick={() => this.handleClick(Menu.PLANNING, Menu.PLANNING_SITE)}
                  >
                    <ListItemIcon classes={{ root: "icon-root" }}>
                      <img
                        src={AssignmentIcon}
                        alt="assignment icon"
                        className="item-icon"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary= "Site"
                      classes={{ primary: "item-text", root: "item-text" }}
                    />
                  </ListItem>
                </List>
              }
            </Collapse>
            {/* Production */}
            <ListItem
              button
              key="jobs"
              className={
                this.props.path === (Menu.PRODUCTION)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.PRODUCTION, "")}
            >
              <ListItemIcon classes={{ root: "icon-root" }}>
                <img
                  src={ProductionIcon}
                  alt="assignment icon"
                  className="item-icon"
                />
              </ListItemIcon>
              <ListItemText
                primary="Production"
                classes={{ primary: "item-text", root: "item-text" }}
              />
            </ListItem>
            {/* Allocation */}
            <ListItem
              button
              key="jobs"
              className={
                this.props.path === (Menu.ALLOCATION)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.ALLOCATION, "")}
            >
              <ListItemIcon classes={{ root: "icon-root" }}>
                <img
                  src={AllocationIcon}
                  alt="assignment icon"
                  className="item-icon"
                />
              </ListItemIcon>
              <ListItemText
                primary="Allocation"
                classes={{ primary: "item-text", root: "item-text" }}
              />
            </ListItem>
            {/* Delivery */}
            <ListItem
              button
              key="jobs"
              className={
                this.props.path === (Menu.DELIVERY)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.DELIVERY, "")}
            >
              <ListItemIcon classes={{ root: "icon-root" }}>
                <img
                  src={DeliveryIcon}
                  alt="assignment icon"
                  className="item-icon"
                />
              </ListItemIcon>
              <ListItemText
                primary="Delivery"
                classes={{ primary: "item-text", root: "item-text" }}
              />
            </ListItem>
            {/* Execution */}
            <ListItem
              button
              key="jobs"
              className={
                this.props.path === (Menu.EXECUTION)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.EXECUTION, "")}
            >
              <ListItemIcon classes={{ root: "icon-root" }}>
                <img
                  src={ExecutionIcon}
                  alt="assignment icon"
                  className="item-icon"
                />
              </ListItemIcon>
              <ListItemText
                primary="Execution"
                classes={{ primary: "item-text", root: "item-text" }}
              />
            </ListItem>
          </List>
        </Drawer>
      );
    }
    return drawer;
  }
}

export default SideMenuComponent;