var express = require('express')
  , bodyParser = require('body-parser')
  , consign = require('consign');

module.exports = function(){
  var app = express();

  app.set('port', process.env.PORT || 4000);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({"extended": true}));
  app.use(express.static('./public'));


  consign({cwd: 'app', logger: console})
    .include('models')
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};
