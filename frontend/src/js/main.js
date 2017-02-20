/*global firebase*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { MenuItem, Nav, Navbar, NavbarHeader, NavItem, NavDropdown, Button } from 'react-bootstrap'
import { Provider, connect } from 'react-redux';

import { subscribeUsers } from './actions/talentActions';
import store from './store';

import { Talent, Talents } from './talents';
import { Client, Clients } from './clients';
import { Login } from './Login';
import * as userActions from './actions/userActions';

@connect((store) => {
  return store;
})
class App extends React.Component {
  logout () {
    this.props.dispatch(userActions.logout());
  }
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  render() {

    const centerLinks = (
      <Nav>
        <li><Link to='/contact'>Contact</Link></li>
        <li><Link to='/talents'>Talents</Link></li>
        <li><Link to='/clients'>Clients</Link></li>
      </Nav>
    );
    const rightLink = (
        <Link to='/login'><li>Login</li></Link>
    );
    const navbarInstance = (
      <Navbar inverse collapseOnSelect className="navbar-static-top">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Foresight</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { this.props.user.user ? centerLinks : null }
          <Nav pullRight>
            <li>
              { !this.props.user.user ? rightLink : <a bsStyle="link" onClick={this.logout} >logout {this.props.user.user.email}</a>}
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    return (
      <div className="container-fluid">
        {navbarInstance}
        {this.props.children}
      </div>
    )
  }
}


class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home...</h1>
      </div>
    );
  }
}

class Contact extends React.Component {
  render() {
    return (
      <div>
        <h1>Contact...</h1>
      </div>
    );
  }
}

@connect((store) => {
  return store;
})
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: 'AIzaSyAAf0EuhOccgdnq8t0140bxCL2YNtQkVGY',
      authDomain: 'vision-151722.firebaseapp.com',
      databaseURL: 'https://vision-151722.firebaseio.com',
      storageBucket: 'vision-151722.appspot.com',
      messagingSenderId: '828699221164'
    };
    firebase.initializeApp(config);
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.dispatch(userActions.getCurrentUser());
    });
    this.props.dispatch(userActions.getCurrentUser());
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const requireAuth = (nextState, replace) => {
  if (!store.getState().user.user) {
    store.dispatch({type: 'SET_USER_REDIRECT', payload: nextState.location.pathname});
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};
ReactDOM.render((
  <Provider store={store}>
    <AppContainer>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/login" component={Login} />
          <Route onEnter={ requireAuth } path="/contact" component={Contact} />
          <Route onEnter={ requireAuth } path="/talents" component={Talents} />
          <Route onEnter={ requireAuth } path="/talents/:talentId" component={Talent} />
          <Route onEnter={ requireAuth } path="/clients" component={Clients} />
        </Route>
      </Router>
    </AppContainer>
  </Provider>
), document.getElementById('app'));
