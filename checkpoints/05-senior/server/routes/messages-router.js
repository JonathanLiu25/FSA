import express from 'express';
import db from '../models';
const Message = db.model('message');
const User = db.model('user');

// This router is already mounted on /messages in server/app.js
const router = express.Router();

// get all messages for a particular recipient
router.get('/to/:toId', function (req, res, next) {
  Message.findAll({
    where: {toId: req.params.toId},
    include: [
      {model: User, as: 'to'},
      {model: User, as: 'from'}
    ]
  })
  .then(messages => res.json(messages))
  .catch(next);
});

// get all messages by a particular sender
router.get('/from/:fromId', function (req, res, next) {
  Message.getAllWhereSender(req.params.fromId)
  .then(messages => res.json(messages))
  .catch(next);
});

// create a new message
router.post('/', function (req, res, next) {
  return Message.create(req.body)
  .then(message => res.status(201).json(message))
  .catch(next);
});

export default router;