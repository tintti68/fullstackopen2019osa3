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

let tiedot = [
    {
      id: 1,
      name: 'Arto Hellas',
      number: '043-1234543',
    },
    {
        id: 2,
        name: 'Arto Järvine',
        number: '043-12341212',
      },
      {
        id: 3,
        name: 'Lea Kutvonen',
        number: '0400-24667345',
      },
      {
        id: 4,
        name: 'Martti Tienari',
        number: '09-7842321',
      }
  ]
  app.get('/', (req, res) => {
    res.send('<h1>Täällä ei mitään vielä</h1>')
  })
  
  app.get('/info', (req, res) => {
    const koko = tiedot.length 
    var now = new Date() 
    res.send('<div>Puhelinluettelossa ' + koko + ' henkilön tiedot</div><div>' + now + '</div>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(tiedot)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const kontakti = tiedot.find(tieto => tieto.id === id)
    
    if (kontakti) {
      res.json(kontakti)
    } else {
      res.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    tiedot = tiedot.filter(tieto => tieto.id !== id)
  
    res.status(204).end()
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

    const vanhaTieto = tiedot.filter(tieto => tieto.name === body.name)
    if (vanhaTieto.length > 0) {
      return res.status(400).json({ 
        error: 'name is already listed' 
      })
    }
    const tieto = {
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random() * Math.floor(9999999)) +1,
    }
    tiedot = tiedot.concat(tieto) 
    res.json(tieto)
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })