const mongoose = require('mongoose');


const companiesSchema = new mongoose.Schema({
  companies: {
    type: [],
    required: true
  },
  models: {
    type: [],
    required: true
  }
})

const All_cars_data = mongoose.model('all_cars_datas', companiesSchema);

module.exports = All_cars_data;
