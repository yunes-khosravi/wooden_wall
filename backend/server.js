require('dotenv').config({
  path: '../.env'
});
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const Product = require('./models/Product');
const User = require('./models/User');
const passport = require('passport');
const session = require('express-session');
var cors = require('cors');
const fileUpload = require('express-fileupload');
const {
  spawn
} = require('child_process');
var mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const book_routes = require('./routes/book');
const authentication_routes = require('./routes/authentication');
const log_routes = require('./routes/log');
const favorites_routes = require('./routes/favorites');
const image_routes = require('./routes/image');
const data_routes = require('./routes/data');

// db connections
connectDB();


// passport
passport.use(User.createStrategy());
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
});
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/authback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, (accessToken, refreshToken, profile, cd) => {
  User.findOrCreate({
    googleId: profile.id,
    firstname: profile.name.givenName,
    lastname: profile.name.familyName
  }, (err, user) => cd(err, user));
}));

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/uploads', express.static("uploads"));
app.use('/images', express.static("images"));
app.use(fileUpload());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));



//-----------------------------------auth routes
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ["profile"]
  })
);

app.get('/auth/google/authback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login'
  }), (req, res) => res.redirect('http://localhost:3000/')
);


//-----------------------------------recommendation single route
app.get('/api/recommendations', (req, res) => {
  if (req.isAuthenticated()) {

    const pythonProcess = spawn('python', [__dirname + "/recomendation_system/main.py", req.user.id]);
    var recomendation_Ids = []
    var recomendation_results = []
    pythonProcess.stdout.on('data', (data) => {
      recomendation_results = data.toString().slice(0, -2).split(",")
      for (let i = 0; i < 6; i++) {
        recomendation_Ids.push(mongoose.Types.ObjectId(recomendation_results[i]))
      }
      Product.find({
        '_id': {
          $in: recomendation_Ids
        }
      }).then(result => {
        res.send(result)
        pythonProcess.kill();
      })

    })
  } else return res.status(401).send({
    message: 'authentication error'
  })
})

//-----------------------------------all routes

app.use('/api/book', book_routes);
app.use('/api/authentication', authentication_routes);
app.use('/api/log', log_routes);
app.use('/api/favorites', favorites_routes);
app.use('/api/image', image_routes);
app.use('/api/data', data_routes);


const PORT = process.env.PORT || 3100;
app.listen(PORT, () =>
  console.log(`server is running on port ${PORT}`)
)