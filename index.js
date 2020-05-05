const express = require('express');
const cors = require('cors')
const app = express()

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors())  //cors(corsOptions) // set options for disable unallowd origin
//test


const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.listen(8000, () => {
    console.log('Server started!')
})

//get all
app.route('/api/cats').get((req, res) => {
    res.send({
        cats: [{ name: 'lilly' }, { name: 'lucy' }],
    })
})

//post new
app.route('/api/cats').post((req, res) => {
    res.send(201, req.body)
})

//get specific
app.route('/api/cats/:name').get((req, res) => {
    const requestedCatName = req.params['name']
    res.send({ name: requestedCatName })
})

//update specific
app.route('/api/cats/:name').put((req, res) => {
    res.send(200, req.body)
})

//delete specific
app.route('/api/cats/:name').delete((req, res) => {
    res.sendStatus(204)
})