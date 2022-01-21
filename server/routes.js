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
    .then(result => {
      res.send(result.id)
    })
    .catch(err => { console.log(err); res.send(err) });
});

router.get('/notes', (req, res) => {
  db.notes.get(req.query.username)
    .then(data => {
      res.send(data)
    })
    .catch(err => { console.log(err); res.status(500).send(err) });
});

router.delete('/notes', (req, res) => {
  db.notes.destroy(req.query.username, req.query.noteID)
    .then(() => res.send('success'))
    .catch((err) => { console.log(err); res.status(500).send(err) });
});

router.put('/notes', (req, res) => {
  db.notes.update(req.body.username, req.body.noteID, req.body.text)
    .then(() => res.send('success'))
    .catch((err) => { console.log(err); res.status(500).send(err) });
});

module.exports = router;