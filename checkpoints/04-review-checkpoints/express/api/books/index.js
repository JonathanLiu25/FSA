const router = require('express').Router();
const Book = require('../../models').Book;
const HTTP_Error = require('../../utils').HTTP_Error;

router.get('/', function (req, res, next) {
  Book.findAll({ where: req.query })
  .then(books => res.json(books))
  .catch(next);
});

router.post('/', function (req, res, next) {
  Book.create(req.body)
  .then(book => res.status(201).json(book))
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  Book.findById(req.params.id)
  .then(book => {
    if (!book) throw HTTP_Error(404, 'book not found');
    res.json(book)
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  // in one query, using `returning` syntax
  Book.update(req.body, {
    where: {id: req.params.id},
    returning: true
  })
  .spread((numUpdated, books) => {
    const book = books[0];
    if (!book) throw HTTP_Error(404, 'no book updated');
    res.json(book)
  })
  .catch(next);
  // // alternative: manually, in two queries:
  // Book.findById(req.params.id)
  // .then(book => {
  //   if (!book) throw HTTP_Error(404, 'book not found');
  //   return book.update(req.body);
  // })
  // .then(book => res.json(book))
  // .catch(next);
});

router.delete('/:id', function (req, res, next) {
  // in one query, using
  Book.destroy({where: {id: req.params.id}})
  .then(numDestroyed => {
    if (!numDestroyed) throw HTTP_Error(404, 'no books destroyed');
    res.sendStatus(204);
  })
  .catch(next);
});

router.use('/:id/chapters', function (req, res, next) {
  req.bookId = req.params.id; // to make this availabe in the chapters router
  next(); // move along to next middleware, which is...
}, require('./chapters')); // ...the chapter router.

module.exports = router;
