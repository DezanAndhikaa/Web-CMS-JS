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
  ProductionIcon, ExecutionIcon, DashboardIcon, PlanningIcon } from "../../assets/icons";
import { Menu } from "../../constants";
import "./SideMenuComponent.scss";

class SideMenuComponent extends React.Component {

  handleClick(menu, subMenu) {
    this.props.clickMenu(menu, subMenu);
    if (menu === Menu.PLANNING) {
      if (subMenu !== "") this.props.push(subMenu);
    }else if (menu === Menu.BACKLOG){
      if (subMenu !== "") this.props.push(subMenu);
    } else {
      this.props.push(menu);
    }
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
                this.props.path.includes(Menu.PROBLEMLOG)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.PROBLEMLOG, "")}
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
                this.props.path.includes(Menu.PLANNING)
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
              <List disablePadding>
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
                    this.props.path === Menu.PLANNING_APPROVAL || this.props.path === Menu.PLANNING_TRACKING_HISTORY || this.props.path === Menu.PLANNING_DETAILS_STATUS || this.props.path === Menu.PLANNING_DETAILS || this.props.path === Menu.PLANNING_ALL_NOTIF
                      ? "sub-menu-selected"
                      : "sub-menu"
                  }
                  onClick={() => this.handleClick(Menu.PLANNING, Menu.PLANNING_APPROVAL)}
                >
                  <ListItemIcon classes={{ root: "icon-root" }}>
                    <img
                      src={IcApproval}
                      alt="assignment icon"
                      className="item-icon"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Approval"
                    classes={{ primary: "item-text", root: "item-text" }}
                  />
                </ListItem>
                <ListItem
                  button
                  key="jobs-report"
                  className={
                    this.props.path === Menu.PLANNING_DETAILS_SITE
                      ? "sub-menu-selected"
                      : "sub-menu"
                  }
                  onClick={() => this.handleClick(Menu.PLANNING, Menu.PLANNING_DETAILS_SITE)}
                >
                  <ListItemIcon classes={{ root: "icon-root" }}>
                    <img
                      src={AssignmentIcon}
                      alt="assignment icon"
                      className="item-icon"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Detail"
                    classes={{ primary: "item-text", root: "item-text" }}
                  />
                </ListItem>
              </List>
            </Collapse>
            {/* Production */}
            <ListItem
              button
              key="jobs"
              className={
                this.props.path.includes(Menu.DETAIL_PI)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.DETAIL_PI, "")}
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
                this.props.path.includes(Menu.ALLOCATION)
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
                this.props.path.includes(Menu.FC)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.FC, "")}
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
                this.props.path.includes(Menu.MASTER_DATA)
                  ? "menu-item-selected"
                  : "menu-item"
              }
              onClick={() => this.handleClick(Menu.MASTER_DATA, "")}
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
