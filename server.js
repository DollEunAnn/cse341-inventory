const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');


const port = process.env.PORT || 3000;
const app = express();

app
.use(bodyParser.json())
.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))

.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
})
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
.use(cors({ origin: '*'}))
.use("/", require("./routes/index.js"));

// middleware for github authentication
passport.use(new GitHubStrategy ({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToke, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (error, user) {
        return done(null, profile);
    // });
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { 
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out") 
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/', require('./routes'));

// error handling
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {console.log(`Running on port ${port}`)});
    }
});

