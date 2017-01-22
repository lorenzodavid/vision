import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { MenuItem, Nav, Navbar, NavbarHeader, NavItem, NavDropdown} from 'react-bootstrap'

import { Talent, Talents } from './talents';
import { Client, Clients } from './clients';

class App extends React.Component {
    render() {
        const navbarInstance = (
            <Navbar inverse collapseOnSelect className="navbar-static-top">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>Foresight</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/talents'>Talents</Link></li>
                        <li><Link to='/clients'>Clients</Link></li>
                    </Nav>
                    <Nav pullRight>
                        <NavItem href="../login">Login</NavItem>
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

//export default App;

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home...</h1>
            </div>
        )
    }
}

//export default Home;

class About extends React.Component {
    render() {
        return (
            <div>
                <h1>About...</h1>
            </div>
        )
    }
}

//export default About;

class Contact extends React.Component {
    render() {
        return (
            <div>
                <h1>Contact...</h1>
            </div>
        )
    }
}

//export default Contact;

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/contact" component={Contact} />
            <Route path="/talents" component={Talents} />
            <Route path="/talents/:talentId" component={Talent} />
            <Route path="/clients" component={Clients} />
        </Route>
    </Router>

), document.getElementById('app'))