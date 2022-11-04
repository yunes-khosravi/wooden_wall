const Favorites = require('../models/Favorites');
const Product = require('../models/Product');

const all_favorites = (req, res, next) => {
  if (req.isAuthenticated()) {
    var myobj = []

    Favorites.find({
      userlikeID: req.user._id
    }, (err, founditem) => {

      founditem.map((fav) => myobj.push(fav.productId));
      Product.find({
        _id: {
          $in: myobj
        }
      }, (err, foundbook) => {
        if (err) return console.log(err)
        else return res.send(foundbook)
      })


    })
  } else return res.status(401).send({
    message: 'authentication error'
  })

}

const one_favorite = (req, res, next) => {
  if (req.isAuthenticated()) {
    Favorites.findOne({
      productId: req.params.productId
    }, (err, founddata) => {
      if (err) return console.log(err);
      else if (founddata != null) {
        if (founddata.userlikeID.includes(req.user._id)) return res.send({
          favstate: true
        })
        else return res.send({
          favstate: false
        })
      } else return res.send({
        favstate: false
      })
    })
  } else return res.status(401).send({
    message: 'authentication error'
  })

}

const new_favorites = (req, res, next) => {
  if (req.isAuthenticated()) {
    Favorites.updateOne({
      'productId': req.query.productId
    }, {
      $push: {
        userlikeID: req.user._id
      }
    }, (err) => {
      if (err) return console.log(err);
    })
  } else return res.status(401).send({
    message: 'authentication error'
  })

}

const delete_favorites = (req, res, next) => {
  if (req.isAuthenticated()) {
    Favorites.updateOne({
      'productId': req.query.productId
    }, {
      $pull: {
        userlikeID: req.user._id
      }
    }, (err) => {
      if (err) return console.log(err)
    })
  } else return res.status(401).send({
    message: 'authentication error'
  })
}

module.exports = {
  all_favorites,
  one_favorite,
  new_favorites,
  delete_favorites
};