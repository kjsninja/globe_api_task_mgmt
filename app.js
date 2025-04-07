const express = require('express');
const config = require('./config/config')

const app = express()

app.use('/api', require('./routes'))

app.use((req, res)=>{
  res.status(404).send({
    message: 'Page not found!'
  })
})

app.listen(config.PORT, ()=>{
  console.log(`Listening to port...http://localhost:${config.PORT}`)
})

