/**
 * @desc mongoose is a package that allows us to connect to MongoDB and interact with it using JavaScript
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://USER:USER@cluster0.fxwfiug.mongodb.net/', {
    dbName: 'crud-test',
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

module.exports = {
    mongoose,
}