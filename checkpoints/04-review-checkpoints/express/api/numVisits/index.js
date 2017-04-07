const router = require('express').Router();

router.get('/', function (req, res, next) {
  if (typeof req.session.visits !== 'number') req.session.visits = 0;
  else req.session.visits++;
  res.json({
    number: +req.session.visits
  })
});

module.exports = router;
