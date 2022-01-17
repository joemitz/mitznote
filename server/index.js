const routes = require('./routes.js');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static('./client/dist'));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});