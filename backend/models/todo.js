const mongoose = require('mongoose')

var Todo = mongoose.model('Todo', {
    text: { type: String },
    completed: { type: Boolean },
    created_at: { type: Date, default: Date.now }
})

module.exports = {
    Todo
}