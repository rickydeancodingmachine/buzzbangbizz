const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');

let token = null;
let payload = null;

router.get(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return req.db.user
      .get({ id: req.user, username: null })
      .then(user => {
        res.status(201).json({
          id: user.dataValues.id,
          username: user.dataValues.username,
          num: user.dataValues.num,
        });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  },
);

router.post('/api/users/create', (req, res) => {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      res.status(500).json({ msg: 'Something went wrong', error: err });
    } else {
      return req.db.user
        .create({
          username: req.body.username,
          password: hash,
        })
        .then(user => {
          payload = { id: user.dataValues.id };
          token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
            expiresIn: 60 * 60,
          });
          res.status(201).json({
            msg: 'Successfully created user',
            token: 'bearer ' + token,
            user: {
              id: user.dataValues.id,
              username: user.dataValues.username,
              num: user.dataValues.num,
            },
          });
        })
        .catch(error => {
          if (error.original.code == 23505) {
            // username already in use
            res.status(409).json('Username already in use');
          } else {
            res.status(500).json(error);
          }
        });
    }
  });
});

router.post('/api/users/login', (req, res) => {
  return req.db.user
    .get({ id: null, username: req.body.username })
    .then(user => {
      if (!user) {
        res.status(409).json({ msg: 'Username not recognized' });
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            // error comparing passwords
            res.status(500).json({ msg: 'Something went wrong', error: err });
          }
          if (result) {
            // successfuly authenticated user
            payload = { id: user.dataValues.id };
            token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
              expiresIn: 60 * 60,
            });
            res.status(200).json({
              msg: 'Successfully authenticated user',
              token: 'bearer ' + token,
              user: {
                id: user.dataValues.id,
                username: user.dataValues.username,
                num: user.dataValues.num,
              },
            });
          } else {
            // password failed
            res.status(401).json({ msg: 'Invalid password' });
          }
        });
      }
    })
    .catch(error => {
      res.status(500).json({ msg: 'Something went wrong', error: error });
    });
});

router.post(
  '/api/save',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('saving', req.body.num);
    console.log('user', req.user);
    return req.db.user
      .patch({
        id: req.user,
        num: req.body.num,
      })
      .then(user => {
        console.log('success', user);
        res.status(201).json({
          msg: 'Successfully saved progress',
          newStartingNum: req.body.num,
        });
      })
      .catch(error => {
        console.log('fail', error);
        res.status(500).json(error);
      });
  },
);

router.get(
  '/api/leaderboard',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return req.db.user
      .get({ id: null, username: null })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  },
);

module.exports = router;
