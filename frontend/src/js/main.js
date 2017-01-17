import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import { Talent, Talents } from './talents';
import { Client, Clients } from './clients';

class App extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to='/home'><li>Home</li></Link>
                    <Link to='/about'><li>About</li></Link>
                    <Link to='/contact'><li>Contact</li></Link>
                    <Link to='talents'><li>Talents</li></Link>
                    <Link to='clients'><li>Clients</li></Link>
                    <a href='../login.html'><li>Login</li></a>
                </ul>

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
            <Route path="home" component={Home} />
            <Route path="about" component={About} />
            <Route path="contact" component={Contact} />
            <Route path="talents" component={Talents}>
                
            </Route>
            <Route path="/talents/:talentId" component={Talent} />
            <Route path="clients" component={Clients} />
        </Route>
    </Router>

), document.getElementById('app'))