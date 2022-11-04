const Product = require('../models/Product');

const all_images = (req, res, next) => {
  if (req.isAuthenticated()) {
    Product.findById({
      _id: req.query.id
    }, (err, findedimg) => res.send(findedimg));
  } else return res.status(401).send({
    message: 'authentication error'
  })
}

const delete_image = (req, res, next) => {
  if (req.isAuthenticated()) {
    Product.updateOne({
      _id: req.query.id
    }, {
      $pull: {
        imgUrl: req.query.imgUrl
      }
    }, (err) => {
      if (err) return console.log(err);
    })
  } else return res.status(401).send({
    message: 'authentication error'
  })
}



module.exports = {
  all_images,
  delete_image
};