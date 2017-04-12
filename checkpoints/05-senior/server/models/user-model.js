import Sequelize from 'sequelize';
import db from './_db';

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false, // validate it exists
    validate: {
      notEmpty: true, // validate it isn't empty string
      isEmail: true
    }
  }
});

export default User;