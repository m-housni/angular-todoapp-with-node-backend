const mongoose = require('mongoose')

var User = mongoose.model('User', {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    role: { type: String },
    status: { type: String },
    score: { type: Number},
    created_at: { type: Date, default: Date.now }
})

module.exports = {
    User
}