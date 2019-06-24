const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@kurssikluster-ta4ef.mongodb.net/puhelin?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})



const Luettelo = mongoose.model('Luettelo', personSchema)
if (process.argv.length===3) {
  console.log("phonebook")
  Luettelo.find({}).then(result => {
    result.forEach(element => {
      console.log(element.name + " " + element.number);
    })
    mongoose.connection.close();
  })
}
if (process.argv.length===5) {
  const luettelo = new Luettelo({
    name: process.argv[3],
    number: process.argv[4],
  })

  luettelo.save().then(response => {
    console.log('added ' + process.argv[3] + ' number ' + process.argv[4] + ' to phonebook');
    mongoose.connection.close();
  })
}