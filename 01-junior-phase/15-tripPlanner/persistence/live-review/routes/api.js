var db = require('../models');
var Hotel = db.model('hotel');
var Restaurant = db.model('restaurant');
var Activity = db.model('activity');
var Day = db.model('day');
var router = require('express').Router();

router.get('/hotels', function (req, res, next) {
  Hotel.findAll()
  .then(function (allHotels) {
    res.json(allHotels)
  })
  .catch(next);
});

router.get('/restaurants', function (req, res, next) {
  Restaurant.findAll()
  .then(function (allRestaurants) {
    res.json(allRestaurants)
  })
  .catch(next);
});

router.get('/activities', function (req, res, next) {
  Activity.findAll()
  .then(function (allActivities) {
    res.json(allActivities)
  })
  .catch(next);
});

router.get('/days', function (req, res, next) {
  Day.findAll({
    include: [Hotel, Activity, Restaurant]
  })
  .then(function (allDays) {
    res.json(allDays);
  })
  .catch(next);
});

router.post('/days', function (req, res, next) {
  Day.create(req.body)
  .then(function (createdDay) {
    res.json(createdDay);
  })
  .catch(next);
});

router.put('/days/:dayId', function (req, res, next) {
  // associate the given hotel id with the given day
  Day.findById(req.params.dayId)
  .then(function (day) {
    return day.update(req.body);
  })
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

router.delete('/days/:dayId', function (req, res, next) {
  Day.pluckAndShiftOthers(req.params.dayId)
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

router.post('/days/:dayId/restaurants', function (req, res, next) {
  // associate the given restaurant id with the given day
  Day.findById(req.params.dayId)
  .then(function (day) {
    return day.addRestaurant(req.body.restaurantId);
  })
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

router.post('/days/:dayId/activities', function (req, res, next) {
  // associate the given activity id with the given day
  Day.findById(req.params.dayId)
  .then(function (day) {
    return day.addActivity(req.body.activityId);
  })
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

module.exports = router;
