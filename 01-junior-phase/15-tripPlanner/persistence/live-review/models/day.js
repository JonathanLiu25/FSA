/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  classMethods: {
    pluckAndShiftOthers: function (dayId) {
      var deletedDayNum;
      return Day.findById(dayId)
      .then(function (day) {
        deletedDayNum = day.number;
        return day.destroy();
      })
      .then(function () {
        return Day.findAll({
          where: {
            number: {
              $gt: deletedDayNum
            }
          }
        });
      })
      .then(function (laterDays) {
        var arrOfSavePromises = laterDays.map(function (day) {
          day.number--;
          return day.save();
        });
        return Promise.all(arrOfSavePromises);
      });
    }
  }
});

module.exports = Day;
