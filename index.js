require('dotenv').config()
const express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors')
var morgan = require('morgan')
const app = express()
morgan.token('type', function (req, res) { return JSON.stringify(req.headers['content-type']) })
app.use(morgan({format: 'POST body length in bytes :req[Content-Length]', immediate: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/build'))

const Luettelo = require('./models/phonebook')

  app.get('/', (req, res) => {
    res.send('<h1>Täällä ei mitään vielä</h1>')
  })
  
  app.get('/info', (req, res) => {
    const koko = tiedot.length 
    var now = new Date() 
    res.send('<div>Puhelinluettelossa ' + koko + ' henkilön tiedot</div><div>' + now + '</div>')
  })

  app.get('/api/persons', (req, res) => {
    Luettelo.find({}).then(result => {
        res.json(result)
    })
    
  })

  app.get('/api/persons/:id', (req, res) => {
    Luettelo.findById(req.params.id).then(tieto => {
      res.json(tieto.toJSON())
    })
  })

  app.delete('/api/persons/:id', (req, res) => {
    Luettelo.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error);
      response.status(404).end()
    })
  
  })

  app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name) {
      return res.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
      return res.status(400).json({ 
        error: 'number missing' 
      })
    }

    const tieto = new Luettelo({
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random() * Math.floor(9999999)) +1,
    })

    tieto.save().then(saveduser => {
      res.json(saveduser.toJSON())
    })
    
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })