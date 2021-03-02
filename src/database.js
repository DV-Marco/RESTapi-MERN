const mongoose = require('mongoose');

const URI = "mongodb://localhost/mern-task";

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then((db) => {
        console.log("DB is conected");
    })
    .catch((err) => {
        console.error(err)
    })

module.exports = mongoose;