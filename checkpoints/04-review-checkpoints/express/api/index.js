const router = require('express').Router();
const bookRouter = require('./books');
const visitRouter = require('./numVisits');

router.use('/books', bookRouter)
router.use('/numVisits', visitRouter)

module.exports = router;
