const express = require('express');
const config = require('./config/config')
const app = express()


app.get('/', (req, res)=>{
  res.send({
    message: 'Hello World'
  })
})

app.listen(config.PORT, ()=>{
  console.log(`Listening to port...http://localhost:${config.PORT}`)
})

