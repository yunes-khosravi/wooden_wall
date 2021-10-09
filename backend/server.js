require('dotenv').config({ path: '../.env' });
const express = require('express');
const connectDB = require('./config/db');
const connectuserDB = require('./config/userdb');
const bodyParser = require("body-parser");
const Product = require('./models/Product');
const User = require('./models/User');
const Favorites = require('./models/Favorites');
const Comments = require('./models/Comments');
const passport = require('passport');
const session = require('express-session');
var cors = require('cors');    
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var http = require('http');
const fileUpload = require('express-fileupload');
const _ = require('lodash');




const GoogleStrategy = require('passport-google-oauth20').Strategy;

// db connections
connectDB();
// connectuserDB();


// auths
passport.use(User.createStrategy());


passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  })
});

passport.use(new GoogleStrategy({clientID: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, callbackURL: "http://localhost:5000/auth/google/authback", userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"}, function(accessToken, refreshToken, profile, cd){

  console.log(profile);
  User.findOrCreate({googleId: profile.id, firstname: profile.name.givenName, lastname: profile.name.familyName}, function(err, user){
    return cd(err, user);
  });
}
));

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/uploads', express.static("uploads"));
app.use('/images', express.static("images"));
app.use(fileUpload());

app.use(session({
  secret: 'its my secret.',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.get('/api',function(req, res){
  Product.find(function(err, founditems){
    res.send(founditems)
  })
})



//-----------------------------------auth routes
app.get('/auth/google',
  passport.authenticate('google', {scope: ["profile"] })
);

app.get('/auth/google/authback',
  passport.authenticate('google', {failureRedirect: 'http://localhost:3000/login'}), function(req, res){
    
    res.redirect('http://localhost:3000/')
  }
);

app.get('/api/objectauth', function(req, res){

  if (req.isAuthenticated()) {
    res.send({authstate: 'yes', firstname: req.user.firstname, lastname: req.user.lastname});
  } else {
    res.send({authstate: 'no'})
  }
});

app.post('/api/comment', function(req, res) {
  
  const comment = new Comments ({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    comment: req.body.comment,
    score: req.body.score
  })

  comment.save()
})

app.post('/api/search', function(req, res){
  console.log(req.body);
  if (req.body.searchname == '' && req.body.sort == 'newest' && req.body.model == '')
  {
    Product.find().sort([['date', 1]]).limit(req.body.count).then(result => {
      res.send(result)
    })
    
  } else if (req.body.sort == 'lowprice' && req.body.model == '') {
    Product.find({name: { $regex: req.body.searchname, $options: 'i' }, price: { $ne: '' }}).sort({price : 1}).limit(req.body.count).then(result => {
      res.send(result)
    });
    }
   else if (req.body.sort == 'lowprice') {
  Product.find({name: { $regex: req.body.searchname, $options: 'i' }, model: req.body.model, price: { $ne: '' }}).sort({price : 1}).limit(req.body.count).then(result => {
    res.send(result)
  });
  }else if (req.body.sort == 'highprice' && req.body.model == '') {
    Product.find({name: { $regex: req.body.searchname, $options: 'i' }, price: { $ne: '' }}).sort({price : -1}).limit(req.body.count).then(result => {
      res.send(result)
    });
  }
   else if (req.body.sort == 'highprice') {
    Product.find({name: { $regex: req.body.searchname, $options: 'i' }, model: req.body.model, price: { $ne: '' }}).sort({price : -1}).limit(req.body.count).then(result => {
      res.send(result)
    });
  }else if (req.body.sort == 'agreement' && req.body.model == '') {
    Product.find({name: { $regex: req.body.searchname, $options: 'i' }, price: ''}).sort({price : -1}).limit(req.body.count).then(result => {
      res.send(result)
    });
  }
   else if (req.body.sort == 'agreement') {
    Product.find({name: { $regex: req.body.searchname, $options: 'i' }, model: req.body.model, price: ''}).sort({price : -1}).limit(req.body.count).then(result => {
      res.send(result)
    });
  } else {
    Product.find({name: { $regex: req.body.searchname, $options: 'i' }, model: req.body.model}).sort([['date', 1]]).limit(req.body.count).then(result => {
      res.send(result)
    });
  }

});




app.get('/api/searchfavorites', function(req, res){
    if(req.isAuthenticated()) {
      var myobj =[]
  
      Favorites.find({userlikeID: req.user._id}, function(err, founditem){
        
        founditem.map(function(fav) {
          myobj.push( fav.productId );
          console.log(myobj);
        });
          Product.find({_id: {$in: myobj}}, function(err, foundbook){
            if (err) {
              console.log(err);
            } else {
              res.send(foundbook)
            }
          })        
    
      
      })
    } else {
      console.log('atacked error');
    }


});

// const fav = new Favorites ({
//   productId : "61599a2180263597cdcb15d7",
//   userlikeID : '61599a2180263597cdcdds'
// })
// fav.save();

app.post('/api/favorites', function(req, res){
  
  if (req.isAuthenticated()) {

    if (req.body.reqstate == 'check') {
      Favorites.findOne({productId: req.body.productId}, function(err, founddata){
        if (err) {
          console.log(err);
        } else if (founddata != null) {
          console.log(founddata);
          if (founddata.userlikeID.includes(req.user._id)) {
            res.send({favstate: true})
          } else {
            res.send({favstate: false})
          }
        } else {
          res.send({favstate: false})
        }
      })
    } else if (req.body.reqstate == 'save') {
    
      Favorites.updateOne({'productId': req.body.productId}, { $push: { userlikeID: req.user._id }}, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log('seccus add favorites');
        }
      } )
    } else {
      
      Favorites.updateOne({'productId': req.body.productId}, { $pull: { userlikeID: req.user._id }}, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log('seccus delete favorites');
        } 
      })

    }

  } else {
  
    res.send({favstate: 'notauth'})
  }

})




// app.put('/api/favorites', function(req, res){
//   Favorites.updateOne({productId: req.body.productId}, { $push: { userlikeID: req.user._id }, function(err){
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('seccus favorites');
//     }
//   } })
// })




app.post('/api/book', function(req, res){
  if (req.isAuthenticated() && Number(req.body.price) != 0) {

    let imgpath = []
    _.forEach(_.keysIn(req.files.imageUrl), (key) => {
      let photo = req.files.imageUrl[key];
      imgpath.push(`http://localhost:5000/uploads/${new Date().toISOString().replace(/:/g, '-')}${photo.name}`)
      photo.mv(`${__dirname}/uploads/${new Date().toISOString().replace(/:/g, '-')}${photo.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }})
    })


    const book = new Product({
      phonenum : req.body.phonenum,
      city : req.body.city,
      name : req.body.name,
      description : req.body.description,
      price : req.body.price,
      imgUrl : imgpath,
      year : req.body.year,
      model: req.body.model,
      userId: req.user._id
    })


    book
    .save()
    .then(result => {

      const productfav = new Favorites ({
        productId : result._id,
        userlikeID : '61599a2180263597cdcdds'
        })
        productfav.save();
      console.log(result);
      // res.status(201).json({
      //   message: "Created product successfully",
      //   createdbook: {
      //       name: result.name,
      //       price: result.price,
      //       _id: result._id,
      //       request: {
      //           type: 'GET',
      //           url: "http://localhost:5000/products/" + result._id
      //       }
      //   }
      // });
      res.redirect('http://localhost:3000/')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  } else {
    console.log('auth err or 0 price');
    res.send('auth error or  0 price')
  }

});



app.get('/submit', function(req, res){
  if (req.isAuthenticated()) {
    res.render('submit');
  } else {
    res.redirect('http://localhost:3000/login')
  }
});

app.post('/submit', function(req, res){

  User.findById(req.user.id, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = req.body.secret;
        foundUser.save(function(){
          res.redirect('localhost:3000/aboutus');
        })
      }
    }
  })
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('http://localhost:3000/');
});

app.post('/api/register', function(req, res){

  User.register({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect('http://localhost:3000/register');
    } else {
      passport.authenticate('local')(req, res, function(){
        // req.body.name
        res.redirect('http://localhost:3000/');
      });
    }
  })

});

app.post('/api/update', function(req, res){

  let imgpath = []
  _.forEach(_.keysIn(req.files.imageUrl), (key) => {
    let photo = req.files.imageUrl[key];
    imgpath.push(`http://localhost:5000/uploads/${new Date().toISOString().replace(/:/g, '-')}${photo.name}`)
    photo.mv(`${__dirname}/uploads/${new Date().toISOString().replace(/:/g, '-')}${photo.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }})
  })

  Product.findById({_id: req.body.id}, function(err, foundpr){

    console.log(foundpr.imgUrl);
    var newimgurl = [...foundpr.imgUrl,...imgpath] ;
  
  
  
  

  Product.updateOne({_id: req.body.id}, {
    phonenum: req.body.phonenum,
     city: req.body.city,
      name: req.body.name,
       year: req.body.year,
       imgUrl: newimgurl,
        description: req.body.description,
         price: req.body.price
        }, function(err){
          if (err) {
            console.log(err);
          } else {
            console.log('seccess product update');
            res.redirect('http://localhost:3000/mybooks')
          }
        })
      });
});

app.get('/api/mybooks', function(req, res){
  if (req.isAuthenticated()) {
    Product.find({userId: req.user._id}, function(err, myproducts){
      res.send(myproducts)
    })
  } else {
    console.log('attack error');
  }
});

app.post('/api/delete', function(req, res){
  console.log(req.body.id);
  Product.deleteOne({_id: req.body.id}, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log('delete done');
    }
  })
});

app.post('/api/imgurlpick', function(req, res){
  console.log(req.user)
 if(req.isAuthenticated()) {
  console.log(req.body.id)
  Product.findById({_id: req.body.id}, function(err, findedimg){
    res.send(findedimg);
  });
 } else {
   console.log('auth error');
 }
});




app.post('/api/deleteimg', function(req, res){
  
  Product.updateOne({_id: req.body.id}, { $pull: { imgUrl: req.body.imgUrl }}, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log('seccus delete image of product');
    } 
  })
});



app.post('/api/login', function (req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, function(){
        res.redirect('http://localhost:3000/');
      });
    }
  })

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log('server is running on port ${PORT}')
)
