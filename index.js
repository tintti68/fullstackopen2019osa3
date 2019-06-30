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

    var now = new Date() 
    Luettelo.find({}).countDocuments().then((n) => {
      res.send('<div>Puhelinluettelossa ' + n + ' henkilön tiedot</div><div>' + now + '</div>')
    });
  })

  app.get('/api/persons', (req, res) => {
<<<<<<< HEAD
    Luettelo.find({}).then(tieto => {
      res.json(tieto)
    })
=======
    Luettelo.find({}).then(result => {
        res.json(result)
    })
    
>>>>>>> c1f9b59abc3fe70f3840ffd7d2b55f2d98934acf
  })

  app.get('/api/persons/:id', (req, res, next) => {
    Luettelo.findById(req.params.id).then(tieto => {
      if(tieto){
        res.json(tieto.toJSON())
      } else {
        res.status(404).end() 
      }
    })
    .catch(error => next(error))
  })

  app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
  
    const tieto = {
      name: body.name,
      number: body.number,
    }
  
    Luettelo.findByIdAndUpdate(req.params.id, tieto, { new: true })
      .then(updatedTieto => {
        res.json(updatedTieto.toJSON())
      })
      .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (req, res, next) => {
    Luettelo.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
  
  })

  app.post('/api/persons', (req, res, next) => {
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
    .catch(error => next(error))
    
  })
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  app.use(errorHandler)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })