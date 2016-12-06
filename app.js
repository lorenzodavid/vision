const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const connect = require('connect');

const config = require('config')
const app = express()

const RedisHost = config.get('redis.host');
const RedisPort = config.get('redis.port');

passport.use(
    new LocalStrategy(
	{
	    usernameField: 'email',
	    passwordField: 'password'
	},
	function(email, password, done) {
	    //find user in database here
	    var user = {id: 1, email:'test', password:'pass'};
	    return done(null, user);
	}
    )
);

passport.serializeUser(function(user, done) {
    //serialize by user id
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    //find user in database again
    var user = {id: 1, email:'test', password:'pass'};
    done(null, user);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    store: new RedisStore({RedisHost, RedisPort}),
    secret: 'keyboard cat'
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/login', function (req, res) {
  res.send('Please login.')
})

app.post('/login',
	 passport.authenticate('local',
			       { successRedirect: '/',
                                 failureRedirect: '/login' }))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
