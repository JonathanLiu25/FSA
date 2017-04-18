'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

const sanitizeHtml = require('sanitize-html');

var Story = db.define('story', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  paragraphs: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [],
    set: function (unsanitizedParagraphs) {
      const sanitizedParagraphs = unsanitizedParagraphs.map(sanitizeHtml);
      this.setDataValue('paragraphs', sanitizedParagraphs);
    }
  }
}, {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('user'),
        as: 'author'
      }]
    })
  }
});

module.exports = Story;
