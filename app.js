const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const connect = require('connect');

const config = require('config')
const app = express()

const RedisHost = config.get('redis.host');
const RedisPort = config.get('redis.port');
const GoogleClientId = config.get('auth.google_client_id');
const GoogleSecret = config.get('auth.google_secret');
const GoogleCallbackUrl = config.get('auth.google_callback_url');

passport.use(
    new GoogleStrategy(
	{
	    clientID: GoogleClientId,
	    clientSecret: GoogleSecret,
	    callbackURL: GoogleCallbackUrl
	},
	function(accessToken, refreshToken, profile, done) {
	    User.findOrCreate({ googleId: profile.id }, function (err, user) {
		return done(err, user);
	    });

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

// GET /auth/google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.post('/login',
	 passport.authenticate('google',
			       { successRedirect: '/',
                                 failureRedirect: '/auth/google' }))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
