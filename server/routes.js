const db = require('./db.js');
const router = require('express').Router();

router.post('/signup', (req, res) => {
  db.user.signup(req.body.username, req.body.password)
  .then((result) => res.send(result))
  .catch(err => res.send(err))
});

router.post('/login', (req, res) => {
  db.user.login(req.body.username, req.body.password)
  .then((result) => {
    result === null ? res.send('invalid') : res.send('success')
  })
  .catch(err => {
    res.send(err)
  })
});

router.get('/notes', (req, res) => {

});

router.post('/notes', (req, res) => {

});

router.put('/notes', (req, res) => {

});

router.delete('/notes', (req, res) => {

});

module.exports = router;