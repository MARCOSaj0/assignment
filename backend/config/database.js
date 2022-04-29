const mongoose = require('mongoose');
const { URI } = require('./index');

const db = () => {
    mongoose.connect(URI)
    .then(() => {
        console.log("Database Connected");
    })
    .catch (err => console.log(err));
};

module.exports = db;