const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.locals.userAgent = req.get('User-Agent');
  
  next();
});

app.use('/api', require('./routes'))

app.use((req, res)=>{
  res.status(404).send({
    message: 'Page not found!'
  })
})

app.listen(config.PORT, ()=>{
  console.log(`Listening to port...http://localhost:${config.PORT}`)
})

