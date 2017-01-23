/*global firebase*/
import React from 'react';
import userActions from './actions/userActions';

export class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false
    };
  }
  onSubmit (e) {
    e.preventDefault();
    userActions.loginUserAction(this.state.username, this.state.password);
  }
  onUsernameChange (e) {
    this.setState({
      ...this.state,
      username: e.target.value
    });
  }
  onRememberMeChange (e) {
    this.setState({
      ...this.state,
      rememberMe: e.target.checked
    });
  }
  onPasswordChange (e) {
    this.setState({
      ...this.state,
      password: e.target.value
    });
  }
  render () {
    return (
      <div>
        <div>
          <form id="loginForm" onSubmit={this.onSubmit.bind(this)}>
            <div className="container">
              <label><b>Username</b></label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
                value={this.state.username}
                onChange={this.onUsernameChange.bind(this)}/>

              <label><b>Password</b></label>
              <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  name="psw"
                  required
                  value={this.state.password}
                  onChange={this.onPasswordChange.bind(this)}/>


              <button type="submit">Login</button>
              <input
                type="checkbox"
                checked={this.state.rememberMe}
                onChange={this.onRememberMeChange.bind(this)}
              />
              <div>Remember me</div>
            </div>

            <div className="container" style={{backgroundColor: '#f1f1f1'}}>
              <button type="button" className="cancelbtn">Cancel</button>
              <span className="psw">Forgot <a href="#">password?</a></span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
