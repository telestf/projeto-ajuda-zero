const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3001


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/', require('./routes/oi'))
app.use('/usuario', require('./routes/api/usuario'))

app.listen(PORT, () => {console.log(`App rodando na porta ${PORT}`)})