const router = require('express').Router();
const Chapter = require('../../../models').Chapter;
const HTTP_Error = require('../../../utils').HTTP_Error;

router.get('/', function (req, res, next) {
  Chapter.findAll({
    where: {bookId: req.bookId} // `req.bookId` from book router
  })
  .then(chapters => res.json(chapters))
  .catch(next);
});

router.post('/', function (req, res, next) {
  req.body.bookId = req.bookId;
  Chapter.create(req.body)
  .then(chapter => res.status(201).json(chapter))
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  Chapter.findById(req.params.id)
  .then(chapter => {
    if (!chapter) throw HTTP_Error(404, 'chapter not found');
    res.json(chapter);
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  // in one query, using `returning` syntax
  Chapter.update(req.body, {
    where: {id: req.params.id},
    returning: true
  })
  .spread((numUpdated, chapters) => {
    const chapter = chapters[0];
    if (!chapter) throw HTTP_Error(404, 'no chapter updated');
    res.json(chapter);
  })
  .catch(next);
  // // alternative: manually, using two queries
  // Chapter.findById(req.params.id)
  // .then(chapter => {
  //   if (!chapter) throw HTTP_Error(404, 'chapter not found');
  //   return chapter.update(req.body);
  // })
  // .then(chapter => res.json(chapter))
  // .catch(next);
});

router.delete('/:id', function (req, res, next) {
  Chapter.destroy({
    where: {id: req.params.id}
  })
  .then(numDestroyed => {
    if (!numDestroyed) throw HTTP_Error(404, 'no chapter destroyed')
    res.sendStatus(204)
  })
  .catch(next);
})

module.exports = router;
