 const express = require('express')

/**
 * router is used to create the routes
 */
 const router = express.Router()

const { Todo } = require('../models/todo')

router.get('/', (req, res) => {
    Todo.find({})
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
  var todo = new Todo({
      text: req.body.text,
      completed: req.body.completed,
  })
  todo.save().then((doc) => {
      res.send(doc)
  }, (e) => {
      res.status(400).send(e)
  })
})

router.get('/:id', (req, res) => {
    Todo.findById(req.params.id).then((todo) => {
        if(!todo){
            return res.status(404).send()
        }
        res.send(todo)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.put('/:id', (req, res) => {
  Todo.findById(req.params.id).then((todo) => {
    if(!todo){
      return res.status(404).send()
    }
    todo.set(req.body)
    todo.save().then((todo) => {
      res.send(todo)
    }).catch((e) => {
      res.status(400).send(e)
    })
  }).catch((e) => {
    res.status(400).send(e)
  })
})

router.delete('/:id', (req, res) => {
  Todo.findById(req.params.id).then((todo) => {
    if(!todo){
      return res.status(404).send()
    }
    Todo.deleteOne(todo).then(() => {
      res.send(todo)
    }).catch((e) => {
      res.send(e)
    })
  }).catch((e) => {
    res.status(400).send(e)
  })
})

module.exports = router