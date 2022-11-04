const Product = require('../models/Product');
const {
  spawn
} = require('child_process');
const _ = require('lodash');
const PythonShell = require('python-shell').PythonShell;
const Favorites = require('../models/Favorites');

const all_carts = (req, res, next) => {

  Product.find({
    $and: [{
      price: {
        $gt: -2
      }
    }, ]
  }).sort({
    imgUrl: -1
  }).limit(8).then(result => {
    res.send(result)
  })
};

const some_carts = async (req, res, next) => {
  if (req.params.type === 'new_search') {
    console.log(req.params)
    console.log(req.query)
    const Sort_Rols = [{
        imgUrl: -1
      },
      {
        price: 1
      },
      {
        price: -1
      },
    ]

    if (Number(req.query.sort) > 0) {
      Min_Price = 0
    } else {
      Min_Price = -2
    }
    await Product.find({
      $and: [{
          color: req.query.color || {
            $type: 'string'
          }
        },
        {
          company: req.query.company || {
            $type: 'string'
          }
        },
        {
          name: {
            $regex: req.query.searchname,
            $options: 'i'
          }
        },
        {
          price: {
            $gt: Min_Price
          }
        },
      ]
    }).sort(Sort_Rols[Number(req.query.sort)]).limit(req.query.count).then(result => res.send(result))
  } else if (req.params.type === 'mybooks') {
    if (req.isAuthenticated()) return Product.find({
      userId: req.user._id
    }, (err, myproducts) => res.send(myproducts))
    else return res.status(401).send({
      message: 'authentication error'
    })
  } else return res.status(400).send({
    message: 'missing or wrong value'
  })
};
const Update = async (req, res, next) => {
  if (req.isAuthenticated()) {
    Product.updateOne({
      _id: req.body.Id
    }, {
      phonenum: req.body.Phonenum,
      city: req.body.City,
      name: req.body.Name,
      year: req.body.Year,
      description: req.body.Description,
      price: req.body.Price
    }, (err) => {
      if (err) return console.log(err)
      else return console.log('seccess product update')
    })
  } else return res.status(401).send({
    message: 'athentication error'
  });
}

const Delete = async (req, res, next) => {
  if (req.isAuthenticated()) {
    Product.deleteOne({
      _id: req.params.id
    }, (err) => {
      if (err) return console.log(err)
    })
  } else {
    res.status(401).send({
      message: 'authentication error'
    })
  }
}

const new_book = async (req, res, next) => {
  if (req.isAuthenticated()) {
    var Price = -1;
    if (req.body.price > 0) return Price = Number(req.body.price);
    const imgpath = []
    var images_score = 0
    if (req.files.imageUrl.length >= 2) {

      _.forEach(_.keysIn(req.files.imageUrl), async (key) => {
        var photo = req.files.imageUrl[key];
        imgpath.push(`http://localhost:5000/uploads/${new Date().toISOString().replace(/:/g, '-')}${photo.name}`)
        img_name = `${new Date().toISOString().replace(/:/g, '-')}${photo.name}`
        photo.mv(`${__dirname}/../uploads/` + img_name, (err) => {
          if (err) {
            console.log(err)
            return res.status(500).send({
              msg: "Error occured"
            });
          }
        })
        var options = {
          args: img_name
        };
        PythonShell.run('./car_detect/main.py', options, (err, results) => images_score += Number(results))
      })
      await new Promise(resolve => setTimeout(resolve, 14000));
      console.log(images_score);
      images_score = images_score / req.files.imageUrl.length
    } else {

      let photo = req.files.imageUrl;
      imgpath.push(`http://localhost:5000/uploads/${new Date().toISOString().replace(/:/g, '-')}${photo.name}`)
      img_name = `${new Date().toISOString().replace(/:/g, '-')}${photo.name}`
      photo.mv(`${__dirname}/../uploads/` + img_name, (err) => {
        if (err) return res.status(500).send({
          message: "Error occured",
          error: err
        })
      })

      const python = spawn('python', [__dirname + "/car_detect/main.py", img_name]);
      python.stdout.on('data', (data) => {
        images_score = Number(data.toString());
        console.log(images_score);
      })
      await new Promise(resolve => setTimeout(resolve, 8000));
    }

    if (images_score == 1) {
      console.log(req.body);

      const book = new Product({
        country: req.body.country,
        phonenum: req.body.phonenum,
        city: req.body.city,
        name: req.body.name,
        description: req.body.description,
        price: Price,
        Type: req.body.Type,
        imgUrl: imgpath,
        year: req.body.year,
        company: req.body.company,
        lng: parseFloat(req.body.lng),
        lat: parseFloat(req.body.lat),
        model: req.body.model,
        color: req.body.color,
        userId: req.user._id,
      })
      book
        .save()
        .then(result => {
          const productfav = new Favorites({
            productId: result._id,
            userlikeID: ''
          })
          productfav.save();
          res.redirect('http://localhost:3000/')
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });

    } else return res.redirect('http://localhost:3000/change')
  } else return res.status(401).send({
    message: 'authentication error'
  })

}

module.exports = {
  all_carts,
  some_carts,
  Update,
  Delete,
  new_book
};