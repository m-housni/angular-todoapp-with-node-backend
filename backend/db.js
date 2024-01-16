/**
 * @desc mongoose is a package that allows us to connect to MongoDB and interact with it using JavaScript
 */
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
    dbName: 'crud-test',
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

module.exports = {
    mongoose,
}