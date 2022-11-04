const All_cars_data = require('../models/All_cars_data');

const data_uploader = (req, res, next) => {
    if (req.params.type === 'companies') return All_cars_data.find((err, data) => res.send(data))
    else return res.status(501).send({
        message: 'sorry we just can send companies data for now !'
    })
}

module.exports = {
    data_uploader
}