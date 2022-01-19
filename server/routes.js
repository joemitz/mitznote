const db = require('./db.js');
const router = require('express').Router();

router.post('/signup', (req, res) => {
  db.user.signup(req.body.username, req.body.password)
    .then(result => res.send(result))
    .catch(err => { console.log(err); res.send(err) });
});

router.post('/login', (req, res) => {
  db.user.login(req.body.username, req.body.password)
    .then(result => {
      result === null ? res.send('invalid') : res.send('success')
    })
    .catch(err => { console.log(err); res.send(err) });
});

router.post('/notes', (req, res) => {
  db.notes.create(req.body.username, req.body.title, req.body.text)
    .then(result => res.send('success'))
    .catch(err => { console.log(err); res.send(err) });
});

router.get('/notes', (req, res) => {
  console.log(req.query.username);
  res.end();
});

router.put('/notes', (req, res) => {

});

router.delete('/notes', (req, res) => {

});

module.exports = router;