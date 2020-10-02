
import React from 'react';
import moment from 'moment-timezone';
import { ConnectedRouter } from 'connected-react-router';
import NavBarComponent from 'components/NavigationBar';
import routes from 'routes';
import SideMenuComponent from 'components/SideMenu';

class App extends React.Component {
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentDidMount() {
    this.props.getUserData();
    this.handleWindowSizeChange();
    this.props.setTimezone(moment().format('Z'));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    let mode = 'web';
    if (window.innerWidth < 600) { mode = 'mobile'; } else if (window.innerWidth < 1026) { mode = 'tab'; }
    this.props.setDisplayMode(mode);
  }

  render() {
    return (
      <div className="app-container">
        <NavBarComponent />
        <SideMenuComponent />
        <ConnectedRouter history={this.props.history}>
          {routes}
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
