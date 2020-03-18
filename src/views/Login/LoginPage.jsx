import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button, Input } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  MovingAsOneLogo, UTLogo, ArrowRight,
  CmsLogo, MovingAsOneInverse, LoginBg
} from '../../assets/imgs';
import './LoginPage.scss';
import isAccessTokenValid from '../../core/HelpersFunction';
import Message from '../../components/Message/Message';
import { Menu, BasePath } from '../../constants';
import { ApiRequestActionsStatus } from '../../core/RestClientHelpers';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
    };
  }

  componentWillMount() {
    if (isAccessTokenValid()) { this.props.push(Menu.DASHBOARD); }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loginRequest !== this.props.loginRequest
      && this.props.loginRequest.status === ApiRequestActionsStatus.SUCCEEDED) {
      this.props.saveUserData(this.props.loginRequest.payload);
      this.props.push(Menu.DASHBOARD);
    }
  }

  handleUsernameChange = (event) => { this.setState({ username: event.target.value }); }

  handlePasswordChange = (event) => { this.setState({ password: event.target.value }); }

  handleLogin = () => { this.props.login(this.state.username, this.state.password); }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') return this.handleLogin();
    return this.setState({ password: event.target.value });
  }

  isDisabled() { return this.state.username === '' || this.state.password === ''; }

  renderForm() {
    return (
      <form noValidate autoComplete="off" className="login-form">
        <label htmlFor="username" className="username-label">USERNAME</label>
        <Input id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} className="username-input" placeholder="Input your username" classes={{ input: 'username-input-text' }} />
        <label htmlFor="password" className="password-label">PASSWORD</label>
        <Input onKeyPress={this.handleKeyPress} id="password" type={this.state.showPassword ? 'text' : 'password'} value={this.state.password} onChange={this.handlePasswordChange} className="password-input" placeholder="Input your password" classes={{ input: 'username-input-text' }} />
        {
          this.state.showPassword
            ? <Visibility className="visibility-icon" onClick={() => this.setState((prevState) => ({ showPassword: !prevState.showPassword }))} />
            : <VisibilityOff className="visibility-icon" onClick={() => this.setState((prevState) => ({ showPassword: !prevState.showPassword }))} />
        }
        <Button disabled={this.isDisabled()} variant="contained" className={this.isDisabled() ? 'btn-login-disabled' : 'btn-login'} onClick={this.handleLogin}>
          Log In &nbsp; &nbsp;
          <img alt="" src={ArrowRight} className="arrow-icon" />
        </Button>
      </form>
    );
  }

  renderLinearProgress() { if (this.props.loginRequest.status === ApiRequestActionsStatus.LOADING) return <LinearProgress classes={{ barColorPrimary: 'bar-color' }} />; }

  renderError() { if (this.props.loginRequest.status === ApiRequestActionsStatus.FAILED) return <Message type="Error" message="Username or password is invalid. Please try again" />; }

  render() {
    if (window.innerWidth > 1025) {
      return (
        <div>
          {this.renderLinearProgress()}
          <div className="login-page">
            <div className="left-pane">
              <img src={BasePath + LoginBg} className="login-bg" alt="" />
              <img src={UTLogo} className="logo-ut" alt="united tractors" />
              <div className="app-title">
                <p className="appname1">COMPONENT</p>
                <p className="appname2">MANAGEMENT SYSTEM</p>
              </div>
            </div>
            <div className="right-pane">
              <img src={MovingAsOneLogo} className="movingasone" alt="logo" />
              <div className="login-form-container">
                <div className="login-form-inner">
                  {this.renderError()}
                  <h2 className="login-title">Log In</h2>
                  {this.renderForm()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        {this.renderLinearProgress()}
        <div className="login-page-mobile">
          <img src={BasePath + LoginBg} className="login-bg" alt="" />
          <img src={UTLogo} className="logo-ut" alt="united tractors" />
          <div className="login-form-container">
            <img alt="logo" src={`${CmsLogo}`} className="dca-logo" />
            {this.renderError()}
            {this.renderForm()}
          </div>
          <img alt="" src={`${BasePath + MovingAsOneInverse}`} className="movingasone" />
        </div>
      </div>
    );
  }
}

export default LoginPage;