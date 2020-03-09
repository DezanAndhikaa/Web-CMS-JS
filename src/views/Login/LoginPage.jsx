import React from 'react';
import './LoginPage.scss'
import { Button, Input } from '@material-ui/core';
import { Menu } from '../../constants';
import { ApiRequestActionsStatus } from '../../core/RestClientHelpers';
import isAccessTokenValid from '../../core/HelpersFunction'

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentWillMount() {
        if (isAccessTokenValid()) { this.props.push(Menu.PLANNING); }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loginRequest !== this.props.loginRequest
          && this.props.loginRequest.status === ApiRequestActionsStatus.SUCCEEDED) {
          this.props.saveUserData(this.props.loginRequest.payload);
        //   this.props.push(Menu.DASHBOARD);
        this.props.push(Menu.DASHBOARD);
        }
    }

    handleUsernameChange = (event) => { this.setState({ username: event.target.value }); }
    
    handlePasswordChange = (event) => { this.setState({ password: event.target.value }); }
    
    handleLogin = () => { this.props.login(this.state.username, this.state.password); }

    // handleKeyPress = (event) => {
    //     if (event.key === 'Enter') return this.handleLogin();
    //     return this.setState({ password: event.target.value });
    //   }

    render(){
        return(
            <div className="body">
                <div>
                    <label className="labels">USERNAME</label>
                    <Input id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Input your username" />
                </div>
                <div>
                    <label className="labels">PASSWORD</label>
                    <Input id="password" type="text" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Input your password" />
                </div>
                <div>
                    <Button onClick={this.handleLogin}>
                        Log In &nbsp; &nbsp;
                    </Button>
                </div>
            </div>
        )
    }
}

export default LoginPage;