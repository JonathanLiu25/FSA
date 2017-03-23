var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');
var Day = require('./day');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

Day.belongsTo(Hotel); // day will get a hotelId
Day.belongsToMany(Restaurant, {through: 'days_restaurants'});
Day.belongsToMany(Activity, {through: 'days_activities'});

// // reverse associations
// Hotel.hasMany(Day);
// Restaurant.belongsToMany(Day, {through: 'days_restaurants'});
// Activity.belongsToMany(Day, {through: 'days_activities'});

module.exports = db;
