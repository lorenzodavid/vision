/*global firebase*/
import React from 'react';
import * as userActions from './actions/userActions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import styles from '../css/login.css';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

@connect((store) => {
  return store;
})
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
    this.props.dispatch(userActions.loginUserAction(this.state.username, this.state.password));
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
    if (this.props.user.user) {
      if (this.props.user.redirectUrl) {
        const redirectUrl = this.props.user.redirectUrl;
        this.props.dispatch({
          type: 'SET_USER_REDIRECT',
          payload: null
        });
        browserHistory.replace(redirectUrl);
      } else {
        browserHistory.push('/');
      }
    }
    return (
      <div className={styles.page}>
        <form id="loginForm" className={ styles.form }onSubmit={this.onSubmit.bind(this)}>
          <div className={styles.container}>
             <FieldGroup
              id="username"
              label="Username"
              type="text"
              name="uname"
              required
              placeholder="Enter Username"
              onChange={this.onUsernameChange.bind(this)}
              value={this.state.username}
            />
            <FieldGroup
              id="password"
              type="password"
              label="Password"
              placeholder="Enter Password"
              name="psw"
              required
              value={this.state.password}
              onChange={this.onPasswordChange.bind(this)}
            />
            <Button type="submit">Login</Button>
            <div>
              {this.props.user.loginError.errorMessage}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
