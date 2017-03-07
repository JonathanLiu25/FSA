var tweetBank = require('../tweetBank');
var router = require('express').Router();

router.get('/', function (req, res, next) {
  var locals = {
    allTweets: tweetBank.list()
  };
  // because we've configured the above
  // `res.render` will end up calling `nunjucks.render` on `views/index.html`
  // and then calling `response.send` on that rendered result
  res.render('index', locals);
});

router.post('/tweets', function (req, res, next) {
  tweetBank.add(req.body.username, req.body.tweet);
  res.redirect('/');
});

module.exports = router;
