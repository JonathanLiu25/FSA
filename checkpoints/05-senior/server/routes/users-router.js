import express from 'express';
import db from '../models';
const User = db.model('user');
const Message = db.model('message');

// This router is already mounted on /users in server/app.js
const router = express.Router();

// retrieve all users
router.get('/', function (req, res, next) {
  return User.findAll({
    where: req.query
  })
  .then(users => res.json(users))
  .catch(next);
});

// update one user
router.put('/:id', function (req, res, next) {
  return User.update(req.body, {
    where: {id: req.params.id},
    returning: true
  })
  // comes back with a promise for an array [count, users]
  // we only updated one user, and we can get that instance by destructuring
  .then(([count, [user]]) => res.status(201).json(user))
  .catch(next);
});

export default router;