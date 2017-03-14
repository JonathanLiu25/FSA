const express = require('express');
const Sequelize = require('sequelize');

// MODELS
const db = new Sequelize('postgres://localhost/catapp', {
  logging: false
});

const Cat = db.define('cat', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  scratchProbability: {
    type: Sequelize.DECIMAL
  }
}, {
  instanceMethods: {
    getBellyRub: function () {
      if (Math.random() < this.scratchProbability) {
        return 'Kill them! With claws!';
      } else {
        return 'prrrr...';
      }
    }
  },
  classMethods: {
    findAngryOnes: function () {
      return Cat.findAll({
        where: {
          scratchProbability: {
            $gt: 0.5
          }
        }
      });
    }
  }
});

// ROUTES
const app = express();

app.get('/cats', function (req, res, next) {
  Cat.findAll()
  .then(function (cats) {
    res.json(cats);
  })
  .catch(next);
});

app.post('/cats', function (req, res, next) {
  Cat.create(req.body)
  .then(function (cat) {
    res.status(201).json(cat);
  })
  .catch(next);
});

const port = 8080;
app.listen(port, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port', port);
  }
});

module.exports = {
  app: app,
  Cat: Cat
};
