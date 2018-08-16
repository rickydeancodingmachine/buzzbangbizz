const User = require('../models').user;

module.exports = {
  create(data) {
    return User.create({
      username: data.username,
      password: data.password,
      num: 1,
    });
  },
  get(data) {
    if (data.id) {
      return User.findOne({
        where: { id: data.id },
      });
    } else if (data.username) {
      return User.findOne({
        where: { username: data.username },
      });
    } else {
      return User.findAll({
        limit: 5,
        order: [['num', 'DESC'], ['username', 'ASC']],
        attributes: ['username', 'num'],
      });
    }
  },
  patch(data) {
    return User.update({ num: data.num }, { where: { id: data.id } });
  },
};
