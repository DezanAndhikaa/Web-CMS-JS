import React from 'react';
import { Button, TextField, withStyles, LinearProgress } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { UTLogo, CmsLogo, CmsLoginBg, MovingAsOneInverse, LoginBg, UTLogoBlack } from '../../assets/imgs';
import './LoginPage.scss';
import isAccessTokenValid from '../../core/HelpersFunction';
import Message from '../../components/Message/Message';
import { Menu, BasePath } from '../../constants';
import { ApiRequestActionsStatus } from '../../core/RestClientHelpers';
import { Formik } from "formik";
import * as Yup from "yup";

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#FFD500',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FFD500',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#FFD500',
      },
    },
  },
})(TextField);

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
    };
  }

  //Validation Schema
  validationSchema = Yup.object().shape({
    userName: Yup.string(),
    password: Yup.string()
  });

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
    const {message} = this.props;
    return (
      <Formik
        initialValues={{ userName: "", password: "" }}
        validationSchema={this.validationSchema}
        onSubmit={this._handleSubmit}
      >
      <form noValidate autoComplete="off" className="login-form">
        <CssTextField 
          id="username" 
          variant="outlined" 
          type="text" 
          value={this.state.username} 
          onChange={this.handleUsernameChange}
          className="username-input" 
          label="Username" 
          classes={{ input: 'username-input-text' }} 
          helperText={message ? message : ''}
        />
        <CssTextField 
          id="password" 
          variant="outlined" 
          onKeyPress={this.handleKeyPress}
          type={this.state.showPassword ? 'text' : 'password'} 
          value={this.state.password} 
          onChange={this.handlePasswordChange}
          className="password-input" 
          label="Password" 
          classes={{ input: 'username-input-text' }} />
        {
          this.state.showPassword
            ? <Visibility className="visibility-icon" onClick={() => this.setState((prevState) => ({ showPassword: !prevState.showPassword }))} />
            : <VisibilityOff className="visibility-icon" onClick={() => this.setState((prevState) => ({ showPassword: !prevState.showPassword }))} />
        }
        <Button disabled={this.isDisabled()} variant="contained" className={this.isDisabled() ? 'btn-login-disabled' : 'btn-login'} onClick={this.handleLogin}>
          Log In
        </Button>
      </form>
      </Formik>
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
              <img src={CmsLoginBg} className="login-bg" alt="" />
            </div>
            <div className="right-pane">
              <img src={UTLogoBlack} className="logo-ut-login" alt="logo" />
              <div className="login-form-container">
                <div className="login-form-inner">
                  {this.renderError()}
                  <h2 className="login-title">Log In</h2>
                  <div className="login-title-cms">Welcome to the CMS Website</div>
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
          <img alt="" src={`${BasePath + MovingAsOneInverse}`} className="logo-ut" />
        </div>
      </div>
    );
  }
}

export default LoginPage;