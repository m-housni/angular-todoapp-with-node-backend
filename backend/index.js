/**
 * express is used to create the server
 */
const express = require('express')
const cors = require('cors');

/**
 * bodyParser is used to parse the body of the request
 */
const bodyParser = require('body-parser')

/**
 * mongoose is a package that allows us to connect to MongoDB and interact with it using JavaScript
 */
const { mongoose } = require('./db.js')

/**
 * userController is used to create the routes
 */
const userController = require('./controllers/UserController.js')
const todoController = require('./controllers/TodoController.js')

/**
 * app is the express server
 */
const app = express()

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json()) 
app.listen(3000, () => console.log('Server started at port : 3000'))

app.use('/api/users', userController)
app.use('/api/todos', todoController)
