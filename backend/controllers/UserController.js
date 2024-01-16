 const express = require('express')

/**
 * router is used to create the routes
 */
 const router = express.Router()

const { User } = require('../models/user')

router.get('/', (req, res) => {
    User.find({})
    .then(data => {
      res.send({
        count: data.length,
        data
      })
      console.log(data);
    })
    .catch(error => {
      res.send(error);
      console.error(error);
    });
})

router.post('/', (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        role: req.body.role,
        status: req.body.status,
        score: req.body.score,
        created_at: req.body.created_at
    })
    user.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.put('/:id', (req, res) => {
  User.findById(req.params.id).then((user) => {
    if(!user){
      return res.status(404).send()
    }
    user.set(req.body)
    user.save().then((user) => {
      res.send(user)
    }).catch((e) => {
      res.status(400).send(e)
    })
  }).catch((e) => {
    res.status(400).send(e)
  })
})

router.delete('/:id', (req, res) => {
  User.findById(req.params.id).then((user) => {
    if(!user){
      return res.status(404).send()
    }
    User.deleteOne(user).then(() => {
      res.send(user)
    }).catch((e) => {
      res.send(e)
    })
  }).catch((e) => {
    res.status(400).send(e)
  })
})

module.exports = router