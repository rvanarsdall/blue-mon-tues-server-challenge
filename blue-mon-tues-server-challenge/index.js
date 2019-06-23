var express = require('./node_modules/express');
var app = express();
var user = require('./controllers/user-controller');
var animal = require('./controllers/animal-controller')
var sequelize = require('./db');
var bodyParser = require('./node_modules/body-parser');

sequelize.sync();

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use('/user', user);

app.use('/animal', animal)

app.listen(3001, function(){
  console.log('App is listening on port 3001');
})
