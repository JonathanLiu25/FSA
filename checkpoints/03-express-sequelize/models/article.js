'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

const User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

const Article = db.define('article', {

  title: {
    type: Sequelize.STRING,
    allowNull: false, // don't allow NULL in the SQL table row (validation happening at the database level)
    validate: {
      notEmpty: true // don't allow the string to be empty (validation happening at the js level-through sequelize)
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  version: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    get: function () {
      return this.getDataValue('tags').join(', ');
    }
  }

}, {

  getterMethods: {
    snippet: function () {
      if (!this.content) return ''; // needed for Article.update, oddly
      return `${this.content.slice(0, 23)}...`;
    }
  },
  instanceMethods: {
    truncate: function (len) {
      this.content = this.content.slice(0, len);
    }
  },
  classMethods: {
    findByTitle: function (title) {
      return this.findOne({where: {title}});
    }
  },
  hooks: {
    // note that the `beforeSave` hook is documented but not yet released
    beforeUpdate: function (article) {
      article.version++;
    }
  }

});

Article.belongsTo(User, {as: 'author'});

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
