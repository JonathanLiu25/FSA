const express = require('express');
const router = express.Router();

const Article = require('../models/article');

// if any route handler has `:id` in its matcher, run the following function BEFOREHAND
router.param('id', function (req, res, next, theId) {
  Article.findById(theId)
  .then(function (article) {
    if (!article) {
      var err = new Error('not found');
      err.status = 404;
      throw err;
    } else {
      req.article = article;
      next();
    }
  })
  .catch(next);
});

router.get('/articles', function (req, res, next) {
  Article.findAll()
  .then(articles => res.json(articles))
  .catch(next);
});

router.get('/articles/:id', function (req, res, next) {
  res.json(req.article);
});

router.post('/articles', function (req, res, next) {
  Article.create(req.body)
  .then(function (created) {
    res.json({
      message: 'Created successfully',
      article: created
    });
  })
  .catch(next);
});

// // optimal (time-wise) solution uses one query and postgreSQL `returning` capability
// router.put('/articles/:id', function (req, res, next) {
//   Article.update(req.body, {
//     where: {id: req.params.id},
//     returning: true
//   })
//   .then(function ([numUpdated, [firstUpdatedInstance]]) {
//     res.json({
//       message: 'Updated successfully',
//       article: firstUpdatedInstance
//     });
//   })
//   .catch(next);
// });

// more fundamental but verbose solution using two queries
router.put('/articles/:id', function (req, res, next) {
  req.article.update(req.body)
  .then(function (updated) {
    res.json({
      message: 'Updated successfully',
      article: updated
    });
  })
  .catch(next);
});

module.exports = router;
