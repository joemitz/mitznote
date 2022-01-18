const db = require('./db.js');
const router = require('express').Router();

router.post('/login', (req, res) => {
  db.user.login(req.body.username, req.body.password)
  .then(() => res.end('success'))
  .catch(err => console.log(err))
});

router.post('/signup', (req, res) => {
  db.user.signup(req.body.username, req.body.password)
  .then(() => res.end('success'))
  .catch(err => console.log(err))
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