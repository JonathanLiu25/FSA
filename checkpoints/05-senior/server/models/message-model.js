import Sequelize from 'sequelize';
import db from './_db';
const User = db.model('user');

const Message = db.define('message', {
  subject: {
    type: Sequelize.TEXT,
    defaultValue: 'No Subject'
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false, // validate it exists
    validate: {
      notEmpty: true // validate it's not empty string
    }
  },
}, {
  classMethods: {
    // takes a sender id, returns a promise for a populated list of all messages sent by that user
    getAllWhereSender: function (fromId) {
      return this.findAll({
        where: {fromId},
        include: [
          {model: User, as: 'to'},
          {model: User, as: 'from'}
        ]
      });
    }
  },
  instanceMethods: {
    // mutates existing instance to shorten subject to a certain length, can also add ellipses with optional second parameter
    truncateSubject: function (length, addEllipses) {
      if (this.subject.length > length) {
        const postfix = (addEllipses ? '...' : '');
        this.subject = this.subject.slice(0, length) + postfix;
      }
      return this;
    }
  }
});

export default Message;