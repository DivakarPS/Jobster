const mongoose = require('mongoose');


const connect = async () => {
    await mongoose.connect('mongodb://localhost/jobster_db');
}

module.exports = connect;

