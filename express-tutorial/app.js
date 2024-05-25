const express = require('express');
const app = express();
const { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide the name' })
    }
    res.status(201).json({ success: true, person: name })
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find(person => person.id === +id)

    if (!person) {
        res.status(404).send(`Can't find person with id ${id}`)
    }

    const newPeople = people.map(person => {
        if (person.id === +id) {
            person.name = name
        }
        return person
    })

    res.status(200).send(newPeople)
})

app.delete('/api/people/:id', (req, res) => {
    const person = people.find(person => person.id === +req.params.id)

    if (!person) {
        res.status(404).send(`Can't find person with id ${req.params.id}`)
    }

    const newPeople = people.filter(person => person.id !== +req.params.id)

    res.status(200).send(newPeople)
})

app.post('/login', (req, res) => {
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please provide the value')
})

app.listen(5000, () => {
    console.log('Server is listening');
})