var router = require('express').Router();
const { users } = require('../controllers/index');

module.exports = app => {

  router.post('/register', users.register);

  app.use('/api', router);
};